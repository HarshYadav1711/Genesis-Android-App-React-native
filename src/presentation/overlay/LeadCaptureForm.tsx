import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type {AppLanguage} from '../../core/types/locale';
import type {CustomerProfile} from '../../domain/chat';
import type {ChatRepository} from '../../data/chat/chatRepository';
import {withLocalizedTypography} from '../i18n/localizedTypography';
import {CheckIcon} from './OverlayIcons';
import {overlayColors} from './overlayStyles';

type LeadCaptureFormProps = {
  conversationId: string | null;
  profile: CustomerProfile | null;
  language: AppLanguage;
  chatRepository: ChatRepository;
  onComplete: (name: string | null) => void;
};

function LeadFormField({
  value,
  onChangeText,
  placeholder,
  style,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: object;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={overlayColors.muted}
      style={[styles.field, style]}
      selectionColor={overlayColors.copper}
    />
  );
}

export function LeadCaptureForm({
  conversationId,
  profile,
  language,
  chatRepository,
  onComplete,
}: LeadCaptureFormProps) {
  const isArabic = language === 'ar';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submitLead = async () => {
    if (!name.trim() || !email.trim()) {
      setError(
        isArabic
          ? 'الرجاء إدخال الاسم والبريد الإلكتروني'
          : 'Please enter your name and email.',
      );
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await chatRepository.captureLead(
        name.trim(),
        email.trim(),
        phone.trim() || null,
        conversationId,
        profile,
      );
      setSubmitted(true);
      setTimeout(() => onComplete(name.trim()), 2000);
    } catch {
      setError(
        isArabic
          ? 'حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successCard}>
        <View style={styles.successIcon}>
          <CheckIcon />
        </View>
        <Text style={withLocalizedTypography(styles.successTitle, language)}>
          {isArabic ? `شكراً لك، ${name}` : `Thank you, ${name}`}
        </Text>
        <Text style={withLocalizedTypography(styles.successBody, language)}>
          {isArabic
            ? 'سنتواصل معك قريباً بتوصيات مخصصة.'
            : "We'll reach out shortly with personalized recommendations."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {isArabic ? 'احصل على معلومات مخصصة' : 'Get Personalized Information'}
      </Text>

      <LeadFormField
        value={name}
        onChangeText={setName}
        placeholder={isArabic ? 'اسمك الكريم' : 'Your Name'}
      />
      <LeadFormField
        value={email}
        onChangeText={setEmail}
        placeholder={isArabic ? 'بريدك الإلكتروني' : 'Email Address'}
      />

      <View style={styles.phoneRow}>
        <Text style={styles.phonePrefix}>+971</Text>
        <LeadFormField
          value={phone}
          onChangeText={setPhone}
          placeholder={isArabic ? 'رقم الهاتف (اختياري)' : 'Phone (optional)'}
          style={styles.phoneField}
        />
      </View>

      {error ? (
        <Text style={withLocalizedTypography(styles.errorText, language)}>
          {error}
        </Text>
      ) : null}

      <View style={styles.actions}>
        <Pressable
          disabled={submitting}
          onPress={submitLead}
          style={[
            styles.sendButton,
            submitting ? styles.sendButtonDisabled : null,
          ]}>
          <Text style={styles.sendButtonText}>
            {submitting
              ? isArabic
                ? 'جاري الإرسال...'
                : 'Sending...'
              : isArabic
                ? 'إرسال'
                : 'Send'}
          </Text>
        </Pressable>
        <Pressable
          disabled={submitting}
          onPress={() => onComplete(null)}
          style={styles.laterButton}>
          <Text style={withLocalizedTypography(styles.laterText, language)}>
            {isArabic ? 'لاحقاً' : 'Later'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: overlayColors.panelDark,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(196, 149, 106, 0.3)',
    padding: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: overlayColors.copper,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  field: {
    borderRadius: 4,
    backgroundColor: overlayColors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: overlayColors.silver,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 8,
  },
  phonePrefix: {
    borderRadius: 4,
    backgroundColor: overlayColors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: overlayColors.muted,
  },
  phoneField: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#F87171',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  sendButton: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: overlayColors.copper,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(196, 149, 106, 0.6)',
  },
  sendButtonText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: overlayColors.black,
  },
  laterButton: {
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  laterText: {
    fontSize: 14,
    color: overlayColors.muted,
  },
  successCard: {
    borderRadius: 8,
    backgroundColor: overlayColors.panelDark,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(196, 149, 106, 0.3)',
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  successIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(196, 149, 106, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: overlayColors.silver,
    textAlign: 'center',
  },
  successBody: {
    fontSize: 12,
    color: overlayColors.muted,
    textAlign: 'center',
  },
});
