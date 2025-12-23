/**
 * 접근성 규칙 인터페이스
 * 모든 규칙이 구현해야 하는 계약
 */

import type { Issue } from '../entities/Issue';
import type { VirtualElement } from '../entities/VirtualElement';

export interface AccessibilityRule {
  readonly id: string;
  readonly description: string;
  check(element: VirtualElement): Issue | null;
}
