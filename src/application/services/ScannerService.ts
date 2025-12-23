/**
 * 접근성 검사 서비스
 * 도메인 규칙들을 조율하여 검사 수행
 */

import type { AccessibilityRule } from '../../domain/interfaces/AccessibilityRule';
import type { DomAdapter } from '../../domain/interfaces/DomAdapter';
import type { Issue } from '../../domain/entities/Issue';

export class ScannerService {
  constructor(
    private readonly domAdapter: DomAdapter,
    private readonly rules: AccessibilityRule[]
  ) {}

  async scanPage(): Promise<Issue[]> {
    const issues: Issue[] = [];
    const elements = this.domAdapter.querySelectorAll('*');

    for (const element of elements) {
      for (const rule of this.rules) {
        const issue = rule.check(element);
        if (issue) {
          issues.push(issue);
        }
      }
    }

    return issues;
  }

  async scanElement(selector: string): Promise<Issue[]> {
    const element = this.domAdapter.querySelector(selector);
    if (!element) {
      return [];
    }

    const issues: Issue[] = [];
    for (const rule of this.rules) {
      const issue = rule.check(element);
      if (issue) {
        issues.push(issue);
      }
    }

    return issues;
  }
}
