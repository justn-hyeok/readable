/**
 * Background Service Worker
 * Extension의 백그라운드 작업 처리
 */

import { logger } from '../../utils/logger';

// Extension 설치 시
chrome.runtime.onInstalled.addListener(() => {
  logger.info('Readable extension installed');
});

// 메시지 리스너
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.info('Background received message:', message);

  if (message.type === 'GET_SETTINGS') {
    chrome.storage.sync.get(['settings'], (result) => {
      sendResponse(result.settings || {});
    });
    return true;
  }

  if (message.type === 'SAVE_SETTINGS') {
    chrome.storage.sync.set({ settings: message.settings }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  return false;
});

logger.info('Readable background service worker ready');
