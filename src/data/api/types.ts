export type ApiMessage = {
  role: string;
  content: string;
};

export type ChatRequest = {
  message: string;
  conversation_id?: string | null;
  conversation_history?: ApiMessage[];
  current_vehicle?: string | null;
  language?: string;
};

export type CustomerProfileDto = {
  intent?: string;
  vehicle_preferences?: string[];
  priorities?: string[];
  budget_level?: string;
  recommended_action?: string;
  lead_score?: string;
  should_capture_lead?: boolean;
  conversation_insights?: string;
  message_count?: number;
  lead_captured?: boolean;
};

export type ChatResponse = {
  response: string;
  conversation_id: string;
  profile_update?: unknown;
  current_profile: CustomerProfileDto;
};

export type LeadRequest = {
  name: string;
  email: string;
  phone?: string | null;
  conversation_id?: string | null;
  vehicle_interest?: string | null;
  intent_score?: string;
  priorities?: string[];
  budget_level?: string | null;
};

export type LeadResponse = {
  success: boolean;
  lead_id?: number | null;
  message?: string | null;
};

export type ApiErrorDetail = {
  detail?: string | null;
};
