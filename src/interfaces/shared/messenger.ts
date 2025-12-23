/**
 * 메시지 통신 유틸리티
 * Background, Content, Popup 간 타입 안전한 메시지 전송
 */

export type MessageType =
  | 'SCAN_PAGE'
  | 'TRANSFORM_PAGE'
  | 'GET_SETTINGS'
  | 'SAVE_SETTINGS';

export interface Message<T = any> {
  type: MessageType;
  payload?: T;
}

export interface ScanResult {
  success: boolean;
  issues?: Array<{
    id: string;
    severity: string;
    ruleId: string;
    message: string;
    elementPath: string;
    suggestedFix?: string;
  }>;
  error?: string;
}

export interface TransformResult {
  success: boolean;
  message?: string;
  error?: string;
}

// 타입 안전한 메시지 전송 헬퍼
export async function sendMessage<T>(message: Message): Promise<T> {
  return chrome.runtime.sendMessage(message);
}

export async function sendTabMessage<T>(tabId: number, message: Message): Promise<T> {
  return chrome.tabs.sendMessage(tabId, message);
}
