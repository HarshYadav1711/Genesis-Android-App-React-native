import axios, {type AxiosError, type AxiosInstance} from 'axios';

import {GENESIS_API_BASE_URL} from '../../core/config/genesisConfig';
import type {
  ApiErrorDetail,
  ChatRequest,
  ChatResponse,
  LeadRequest,
  LeadResponse,
} from './types';

export class GenesisApiException extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'GenesisApiException';
    this.statusCode = statusCode;
  }
}

function createClient(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 60_000,
    headers: {'Content-Type': 'application/json'},
  });
}

export class GenesisApiService {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string = GENESIS_API_BASE_URL) {
    this.client = createClient(baseUrl);
  }

  async sendChat(request: ChatRequest): Promise<ChatResponse> {
    try {
      const {data} = await this.client.post<ChatResponse>('/chat', request);
      return data;
    } catch (error) {
      throw this.toApiException(error);
    }
  }

  async captureLead(request: LeadRequest): Promise<LeadResponse> {
    try {
      const {data} = await this.client.post<LeadResponse>('/lead', request);
      return data;
    } catch (error) {
      throw this.toApiException(error);
    }
  }

  private toApiException(error: unknown): GenesisApiException {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorDetail>;
      const detail = axiosError.response?.data?.detail;
      const status = axiosError.response?.status;
      return new GenesisApiException(
        detail ?? `Request failed (${status ?? 'unknown'})`,
        status,
      );
    }
    if (error instanceof Error) {
      return new GenesisApiException(error.message);
    }
    return new GenesisApiException('Unknown error');
  }
}
