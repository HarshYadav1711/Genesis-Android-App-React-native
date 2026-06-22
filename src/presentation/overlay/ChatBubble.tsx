import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import type {AppLanguage} from '../../core/types/locale';
import type {ChatMessage} from '../../domain/chat';
import {withLocalizedTypography} from '../i18n/localizedTypography';
import {overlayColors, overlayStyles} from './overlayStyles';

type ChatBubbleProps = {
  message: ChatMessage;
  language: AppLanguage;
};

export function ChatBubble({message, language}: ChatBubbleProps) {
  const isUser = message.role === 'USER';

  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowAssistant,
      ]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
          message.isError ? styles.bubbleError : null,
        ]}>
        {!isUser && !message.isError ? (
          <Text style={styles.assistantLabel}>GENESIS AI</Text>
        ) : null}
        <Text
          style={withLocalizedTypography(
            message.isError ? styles.contentError : styles.content,
            language,
          )}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAssistant: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleUser: {
    backgroundColor: 'rgba(196, 149, 106, 0.2)',
    borderColor: 'rgba(196, 149, 106, 0.3)',
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: overlayColors.panelDark,
    borderColor: overlayColors.border,
    borderBottomLeftRadius: 4,
  },
  bubbleError: {
    backgroundColor: 'rgba(127, 29, 29, 0.2)',
    borderColor: 'rgba(185, 28, 28, 0.3)',
  },
  assistantLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: overlayColors.copper,
    marginBottom: 6,
    fontWeight: '500',
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: overlayColors.silver,
  },
  contentError: {
    color: '#FCA5A5',
  },
});
