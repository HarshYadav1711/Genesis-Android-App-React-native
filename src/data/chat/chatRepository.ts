import type {AppLanguage} from '../../core/types/locale';
import type {Vehicle} from '../../domain/vehicle';
import type {CustomerProfile} from '../../domain/chat';
import type {ApiMessage, CustomerProfileDto} from '../api/types';
import {GenesisApiService} from '../api/genesisApiService';

export type ChatSendResult = {
  responseText: string;
  conversationId: string;
  profile: CustomerProfile;
};

function toDomainProfile(dto: CustomerProfileDto): CustomerProfile {
  return {
    intent: dto.intent ?? 'browsing',
    vehiclePreferences: dto.vehicle_preferences ?? [],
    priorities: dto.priorities ?? [],
    budgetLevel: dto.budget_level ?? 'mid',
    recommendedAction: dto.recommended_action ?? 'engage',
    leadScore: dto.lead_score ?? 'cold',
    shouldCaptureLead: dto.should_capture_lead ?? false,
    conversationInsights: dto.conversation_insights ?? '',
    messageCount: dto.message_count ?? 0,
    leadCaptured: dto.lead_captured ?? false,
  };
}

export class ChatRepository {
  constructor(private readonly apiService: GenesisApiService = new GenesisApiService()) {}

  async sendMessage(
    text: string,
    conversationId: string | null,
    conversationHistory: ApiMessage[],
    currentVehicleId: string | null | undefined,
    language: AppLanguage,
  ): Promise<ChatSendResult> {
    if (!text.trim()) {
      throw new Error('Empty message');
    }

    const response = await this.apiService.sendChat({
      message: text,
      conversation_id: conversationId,
      conversation_history: conversationHistory.slice(-10),
      current_vehicle: currentVehicleId ?? null,
      language,
    });

    return {
      responseText: response.response,
      conversationId: response.conversation_id,
      profile: toDomainProfile(response.current_profile),
    };
  }

  async captureLead(
    name: string,
    email: string,
    phone: string | null | undefined,
    conversationId: string | null,
    profile: CustomerProfile | null,
  ): Promise<void> {
    const vehicleInterest = profile?.vehiclePreferences.join(', ');
    await this.apiService.captureLead({
      name,
      email,
      phone: phone?.trim() || null,
      conversation_id: conversationId,
      vehicle_interest: vehicleInterest || null,
      intent_score: profile?.leadScore ?? 'warm',
      priorities: profile?.priorities ?? [],
      budget_level: profile?.budgetLevel ?? null,
    });
  }
}
