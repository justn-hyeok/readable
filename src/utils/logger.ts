/**
 * 로깅 유틸리티
 * 개발 환경에서만 로그 출력
 */

const isDev = process.env.NODE_ENV !== 'production';

export const logger = {
  info: (...args: any[]) => {
    if (isDev) {
      console.log('[Readable]', ...args);
    }
  },

  warn: (...args: any[]) => {
    if (isDev) {
      console.warn('[Readable]', ...args);
    }
  },

  error: (...args: any[]) => {
    console.error('[Readable]', ...args);
  },

  debug: (...args: any[]) => {
    if (isDev) {
      console.debug('[Readable]', ...args);
    }
  },
};
