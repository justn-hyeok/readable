/**
 * Popup Script
 * Extension 팝업 UI 로직
 */

import { logger } from '../../utils/logger';

const scanBtn = document.getElementById('scanBtn') as HTMLButtonElement;
const transformBtn = document.getElementById('transformBtn') as HTMLButtonElement;
const status = document.getElementById('status') as HTMLDivElement;

function showStatus(message: string, type: 'info' | 'success' | 'error' = 'info') {
  status.textContent = message;
  status.style.backgroundColor = type === 'error' ? '#fee' : type === 'success' ? '#efe' : '#eef';
  status.style.color = type === 'error' ? '#c00' : type === 'success' ? '#0a0' : '#00a';
}

async function sendMessageToActiveTab(message: any) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) {
    throw new Error('No active tab');
  }
  return chrome.tabs.sendMessage(tab.id, message);
}

scanBtn.addEventListener('click', async () => {
  try {
    showStatus('검사 중...', 'info');
    scanBtn.disabled = true;

    const response = await sendMessageToActiveTab({ type: 'SCAN_PAGE' });

    if (response.success) {
      const count = response.issues.length;
      showStatus(`${count}개의 접근성 이슈 발견`, count > 0 ? 'error' : 'success');
      logger.info('Scan results:', response.issues);
    } else {
      showStatus('검사 실패: ' + response.error, 'error');
    }
  } catch (error) {
    logger.error('Scan error:', error);
    showStatus('검사 중 오류 발생', 'error');
  } finally {
    scanBtn.disabled = false;
  }
});

transformBtn.addEventListener('click', async () => {
  try {
    showStatus('개선 중...', 'info');
    transformBtn.disabled = true;

    const response = await sendMessageToActiveTab({ type: 'TRANSFORM_PAGE' });

    if (response.success) {
      showStatus('개선 완료', 'success');
    } else {
      showStatus('개선 실패: ' + response.error, 'error');
    }
  } catch (error) {
    logger.error('Transform error:', error);
    showStatus('개선 중 오류 발생', 'error');
  } finally {
    transformBtn.disabled = false;
  }
});

logger.info('Popup loaded');
