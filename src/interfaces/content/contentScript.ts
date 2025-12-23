/**
 * Content Script
 * 웹 페이지에 주입되어 실행되는 스크립트
 */

import { BrowserDomAdapter } from '../../infrastructure/dom/BrowserDomAdapter';
import { ScannerService } from '../../application/services/ScannerService';
import { ImageAltRule } from '../../domain/rules/scan/ImageAltRule';
import { logger } from '../../utils/logger';

// 메시지 리스너 설정
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.info('Content script received message:', message);

  if (message.type === 'SCAN_PAGE') {
    handleScanPage().then(sendResponse);
    return true; // 비동기 응답
  }

  if (message.type === 'TRANSFORM_PAGE') {
    handleTransformPage().then(sendResponse);
    return true;
  }

  return false;
});

async function handleScanPage() {
  try {
    const domAdapter = new BrowserDomAdapter();
    const rules = [new ImageAltRule()];
    const scanner = new ScannerService(domAdapter, rules);

    const issues = await scanner.scanPage();
    logger.info(`Found ${issues.length} accessibility issues`);

    return {
      success: true,
      issues: issues.map(issue => ({
        id: issue.id,
        severity: issue.severity,
        ruleId: issue.ruleId,
        message: issue.message,
        elementPath: issue.elementPath,
        suggestedFix: issue.suggestedFix,
      })),
    };
  } catch (error) {
    logger.error('Scan failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function handleTransformPage() {
  try {
    // TODO: Implement transformation logic
    logger.info('Transform page requested');
    return {
      success: true,
      message: 'Transformation not yet implemented',
    };
  } catch (error) {
    logger.error('Transform failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

logger.info('Readable content script loaded');
