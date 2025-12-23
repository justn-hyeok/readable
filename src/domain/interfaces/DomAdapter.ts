/**
 * DOM 어댑터 인터페이스
 * 실제 DOM 조작을 추상화
 */

import type { VirtualElement } from '../entities/VirtualElement';

export interface DomAdapter {
  querySelector(selector: string): VirtualElement | null;
  querySelectorAll(selector: string): VirtualElement[];
  setAttribute(path: string, name: string, value: string): void;
  getAttribute(path: string, name: string): string | null;
}
