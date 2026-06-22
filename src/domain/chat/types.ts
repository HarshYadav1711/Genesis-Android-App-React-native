export type VoiceState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING';

export type ChatRole = 'USER' | 'ASSISTANT';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  isError?: boolean;
  timestamp: number;
};

export type CustomerProfile = {
  intent: string;
  vehiclePreferences: string[];
  priorities: string[];
  budgetLevel: string;
  recommendedAction: string;
  leadScore: string;
  shouldCaptureLead: boolean;
  conversationInsights: string;
  messageCount: number;
  leadCaptured: boolean;
};

export type SendMessageResult = {
  text: string;
  profile: CustomerProfile | null;
  shouldCaptureLead: boolean;
};
