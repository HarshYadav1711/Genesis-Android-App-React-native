import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type ListRenderItem,
} from 'react-native';
import Animated, {FadeIn, FadeOut, SlideInRight, SlideOutRight, SlideInLeft, SlideOutLeft} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useLanguage} from '../../app/hooks/useLanguage';
import {greetingText} from '../../data/chat/mockChatResponses';
import {ChatRepository} from '../../data/chat/chatRepository';
import type {Vehicle} from '../../domain/vehicle';
import type {ChatMessage, VoiceState} from '../../domain/chat';
import {withLocalizedTypography} from '../i18n/localizedTypography';
import {AudioVisualizer} from './AudioVisualizer';
import {ChatBubble} from './ChatBubble';
import {CustomerProfilePanel} from './CustomerProfilePanel';
import {LeadCaptureForm} from './LeadCaptureForm';
import {
  CloseIcon,
  MicIcon,
  PersonIcon,
  SendIcon,
  StopIcon,
  VolumeIcon,
} from './OverlayIcons';
import {ThinkingBubble} from './ThinkingBubble';
import {VehicleContextBar} from './VehicleContextBar';
import {overlayMetrics, overlayStyles} from './overlayStyles';
import {useChatViewModel} from './useChatViewModel';

export type GenesisAiOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  currentVehicle: Vehicle | null;
  chatRepository?: ChatRepository;
};

function statusLabel(state: VoiceState, isArabic: boolean): string {
  switch (state) {
    case 'LISTENING':
      return isArabic ? 'يستمع...' : 'Listening...';
    case 'THINKING':
      return isArabic ? 'يفكر...' : 'Thinking...';
    case 'SPEAKING':
      return isArabic ? 'يتحدث...' : 'Speaking...';
    default:
      return isArabic ? 'جاهز للمساعدة' : 'Ready to assist';
  }
}

export function GenesisAiOverlay({
  isOpen,
  onClose,
  currentVehicle,
  chatRepository,
}: GenesisAiOverlayProps) {
  const {language, isArabic, isRtl} = useLanguage();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const repository = useMemo(
    () => chatRepository ?? new ChatRepository(),
    [chatRepository],
  );

  const chat = useChatViewModel(repository);

  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [textInput, setTextInput] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [micError, setMicError] = useState(false);

  const effectiveVoiceState: VoiceState = chat.isLoading ? 'THINKING' : voiceState;

  const panelMaxWidth = useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    const target = showProfile
      ? overlayMetrics.expandedPanelMaxWidth
      : overlayMetrics.chatPanelMaxWidth;
    return Math.min(screenWidth * 0.95, target);
  }, [showProfile]);

  const resetOverlayState = useCallback(() => {
    setTextInput('');
    setVoiceState('IDLE');
    setHasGreeted(false);
    setShowProfile(false);
    setShowLeadForm(false);
    setLeadCaptured(false);
    setMicError(false);
    chat.reset();
  }, [chat]);

  const handleClose = useCallback(() => {
    resetOverlayState();
    onClose();
  }, [onClose, resetOverlayState]);

  const simulateSpeaking = useCallback(async () => {
    setVoiceState('SPEAKING');
    await new Promise<void>(resolve => setTimeout(resolve, 1800));
    setVoiceState('IDLE');
  }, []);

  const handleTextSend = useCallback(async () => {
    const text = textInput.trim();
    if (!text || chat.isLoading) {
      return;
    }
    setTextInput('');
    setVoiceState('THINKING');

    const result = await chat.sendMessageAndAwait(text, language, currentVehicle);
    if (result) {
      if (result.shouldCaptureLead && !leadCaptured) {
        setShowLeadForm(true);
      }
      await simulateSpeaking();
    } else {
      setVoiceState('IDLE');
    }
  }, [
    chat,
    currentVehicle,
    language,
    leadCaptured,
    simulateSpeaking,
    textInput,
  ]);

  const handleMicClick = useCallback(() => {
    if (effectiveVoiceState === 'THINKING') {
      return;
    }

    if (effectiveVoiceState === 'IDLE') {
      setMicError(true);
      setVoiceState('LISTENING');
      setTimeout(() => {
        setVoiceState(prev => (prev === 'LISTENING' ? 'IDLE' : prev));
      }, 1500);
      return;
    }

    if (effectiveVoiceState === 'LISTENING') {
      setVoiceState('IDLE');
      return;
    }

    if (effectiveVoiceState === 'SPEAKING') {
      setVoiceState('LISTENING');
      setTimeout(() => {
        setVoiceState(prev => {
          if (prev === 'LISTENING') {
            setMicError(true);
            return 'IDLE';
          }
          return prev;
        });
      }, 1500);
    }
  }, [effectiveVoiceState]);

  useEffect(() => {
    if (!isOpen) {
      setVoiceState('IDLE');
      setHasGreeted(false);
      return;
    }
    if (hasGreeted) {
      return;
    }
    setHasGreeted(true);
    greetingText(language, currentVehicle);
    simulateSpeaking();
  }, [currentVehicle, hasGreeted, isOpen, language, simulateSpeaking]);

  const scrollToLatest = useCallback(() => {
    listRef.current?.scrollToEnd({animated: true});
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const timer = setTimeout(scrollToLatest, 100);
    return () => clearTimeout(timer);
  }, [chat.messages.length, isOpen, showLeadForm, chat.isLoading, scrollToLatest]);

  const renderMessage: ListRenderItem<ChatMessage> = useCallback(
    ({item}) => <ChatBubble message={item} language={language} />,
    [language],
  );

  const messageKeyExtractor = useCallback((item: ChatMessage) => item.id, []);

  const listFooter = useMemo(
    () => (
      <>
        {showLeadForm && !leadCaptured ? (
          <LeadCaptureForm
            conversationId={chat.conversationId}
            profile={chat.profile}
            language={language}
            chatRepository={repository}
            onComplete={name => {
              setShowLeadForm(false);
              setLeadCaptured(true);
              if (name) {
                simulateSpeaking();
              }
            }}
          />
        ) : null}
        {chat.isLoading ? <ThinkingBubble /> : null}
      </>
    ),
    [
      chat.conversationId,
      chat.isLoading,
      chat.profile,
      language,
      leadCaptured,
      repository,
      showLeadForm,
      simulateSpeaking,
    ],
  );

  if (!isOpen) {
    return null;
  }

  const slideEnter = isRtl ? SlideInLeft : SlideInRight;
  const slideExit = isRtl ? SlideOutLeft : SlideOutRight;

  return (
    <View style={overlayStyles.host} pointerEvents="box-none">
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={overlayStyles.scrim}>
        <Pressable style={{flex: 1}} onPress={handleClose} />
      </Animated.View>

      <Animated.View
        entering={slideEnter.springify().damping(15).stiffness(280).duration(200)}
        exiting={slideExit.duration(250)}
        style={[
          overlayStyles.panelRow,
          isRtl ? overlayStyles.panelRowRtl : overlayStyles.panelRowLtr,
          {
            maxWidth: panelMaxWidth,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}>
        {showProfile ? (
          <ScrollView
            style={overlayStyles.profileSidebar}
            showsVerticalScrollIndicator={false}>
            <Text style={overlayStyles.profileSidebarTitle}>
              {isArabic ? 'رؤى مباشرة' : 'Live Insights'}
            </Text>
            <CustomerProfilePanel profile={chat.profile} />
          </ScrollView>
        ) : null}

        <KeyboardAvoidingView
          style={[overlayStyles.chatColumn, {maxWidth: overlayMetrics.chatPanelMaxWidth}]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={insets.top}>
          <View style={overlayStyles.header}>
            <View style={overlayStyles.headerLeft}>
              <View style={overlayStyles.headerIconCircle}>
                <MicIcon size={16} />
              </View>
              <View>
                <Text style={overlayStyles.headerTitle}>Genesis AI</Text>
                <Text style={overlayStyles.headerSubtitle}>
                  {statusLabel(effectiveVoiceState, isArabic)}
                </Text>
              </View>
            </View>

            <View style={overlayStyles.headerActions}>
              <Pressable
                onPress={() => setShowProfile(prev => !prev)}
                style={[
                  overlayStyles.profileToggle,
                  showProfile ? overlayStyles.profileToggleActive : null,
                ]}>
                <PersonIcon color={showProfile ? '#C4956A' : '#6B6B6B'} />
              </Pressable>
              <Pressable onPress={handleClose} hitSlop={8}>
                <CloseIcon />
              </Pressable>
            </View>
          </View>

          <View style={overlayStyles.visualizerSection}>
            <AudioVisualizer state={effectiveVoiceState} language={language} />
          </View>

          <FlatList
            ref={listRef}
            data={chat.messages}
            keyExtractor={messageKeyExtractor}
            renderItem={renderMessage}
            style={overlayStyles.messageList}
            contentContainerStyle={overlayStyles.messageListContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            initialNumToRender={12}
            maxToRenderPerBatch={8}
            windowSize={7}
            removeClippedSubviews={Platform.OS === 'android'}
            ListFooterComponent={listFooter}
            onContentSizeChange={scrollToLatest}
          />

          {micError ? (
            <View style={overlayStyles.micErrorBanner}>
              <Text style={withLocalizedTypography(overlayStyles.micErrorText, language)}>
                {isArabic
                  ? 'الميكروفون غير متاح. يرجى استخدام مربع النص.'
                  : 'Microphone unavailable — use the text input below.'}
              </Text>
            </View>
          ) : null}

          {currentVehicle ? (
            <VehicleContextBar
              vehicleName={currentVehicle.name}
              language={language}
            />
          ) : null}

          <View style={overlayStyles.inputSection}>
            <Pressable
              onPress={handleMicClick}
              disabled={effectiveVoiceState === 'THINKING'}
              style={[
                overlayStyles.micButton,
                effectiveVoiceState === 'LISTENING'
                  ? overlayStyles.micButtonListening
                  : null,
                effectiveVoiceState === 'SPEAKING'
                  ? overlayStyles.micButtonSpeaking
                  : null,
              ]}>
              {effectiveVoiceState === 'LISTENING' ? (
                <StopIcon />
              ) : effectiveVoiceState === 'SPEAKING' ? (
                <VolumeIcon />
              ) : (
                <MicIcon />
              )}
            </Pressable>

            <Text style={withLocalizedTypography(overlayStyles.inputHint, language)}>
              {isArabic ? 'أو اكتب سؤالك' : 'or type your question'}
            </Text>

            <View style={overlayStyles.inputRow}>
              <TextInput
                value={textInput}
                onChangeText={setTextInput}
                editable={!chat.isLoading}
                placeholder={
                  isArabic
                    ? 'اسأل عن أي سيارة Genesis...'
                    : 'Ask about any Genesis vehicle...'
                }
                placeholderTextColor="#6B6B6B"
                selectionColor="#C4956A"
                style={withLocalizedTypography(overlayStyles.textInput, language)}
                onSubmitEditing={handleTextSend}
                returnKeyType="send"
              />
              <Pressable
                onPress={handleTextSend}
                disabled={!textInput.trim() || chat.isLoading}
                style={[
                  overlayStyles.sendButton,
                  textInput.trim() && !chat.isLoading
                    ? overlayStyles.sendButtonActive
                    : overlayStyles.sendButtonDisabled,
                ]}>
                <SendIcon />
              </Pressable>
            </View>

            <Pressable onPress={handleClose}>
              <Text style={withLocalizedTypography(overlayStyles.endConversation, language)}>
                {isArabic ? 'إنهاء المحادثة' : 'End Conversation'}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
