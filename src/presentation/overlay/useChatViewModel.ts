import {useCallback, useRef, useState} from 'react';

import type {AppLanguage} from '../../core/types/locale';
import type {Vehicle} from '../../domain/vehicle';
import type {
  ChatMessage,
  CustomerProfile,
  SendMessageResult,
} from '../../domain/chat';
import type {ApiMessage} from '../../data/api/types';
import {ChatRepository} from '../../data/chat/chatRepository';

function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChatViewModel(chatRepository: ChatRepository = new ChatRepository()) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const conversationHistoryRef = useRef<ApiMessage[]>([]);
  const isLoadingRef = useRef(false);

  const sendMessageAndAwait = useCallback(
    async (
      text: string,
      language: AppLanguage,
      currentVehicle: Vehicle | null,
    ): Promise<SendMessageResult | null> => {
      const trimmed = text.trim();
      if (!trimmed || isLoadingRef.current) {
        return null;
      }

      isLoadingRef.current = true;
      setIsLoading(true);

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'USER',
        content: trimmed,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, userMessage]);
      conversationHistoryRef.current.push({role: 'user', content: trimmed});

      try {
        const result = await chatRepository.sendMessage(
          trimmed,
          conversationId,
          conversationHistoryRef.current,
          currentVehicle?.id ?? null,
          language,
        );

        setConversationId(prev => prev ?? result.conversationId);
        setProfile(result.profile);

        const assistantMessage: ChatMessage = {
          id: createMessageId(),
          role: 'ASSISTANT',
          content: result.responseText,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        conversationHistoryRef.current.push({
          role: 'assistant',
          content: result.responseText,
        });

        return {
          text: result.responseText,
          profile: result.profile,
          shouldCaptureLead: result.profile.shouldCaptureLead,
        };
      } catch {
        const errorMessage: ChatMessage = {
          id: createMessageId(),
          role: 'ASSISTANT',
          content:
            language === 'ar'
              ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
              : "I apologize — I'm having trouble connecting right now. Please try again in a moment.",
          isError: true,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, errorMessage]);
        return null;
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    },
    [chatRepository, conversationId],
  );

  const reset = useCallback(() => {
    setMessages([]);
    setProfile(null);
    setConversationId(null);
    isLoadingRef.current = false;
    setIsLoading(false);
    conversationHistoryRef.current = [];
  }, []);

  return {
    messages,
    isLoading,
    profile,
    conversationId,
    sendMessageAndAwait,
    reset,
  };
}
