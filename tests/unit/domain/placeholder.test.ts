/**
 * 테스트 예시
 * 실제 테스트는 추후 구현
 */

import { describe, it, expect } from 'vitest';
import { IssueEntity } from '../../../src/domain/entities/Issue';

describe('IssueEntity', () => {
  it('should create an issue with generated id', () => {
    const issue = new IssueEntity({
      severity: 'error',
      ruleId: 'test-rule',
      message: 'Test message',
      elementPath: 'div > img',
    });

    expect(issue.id).toBeDefined();
    expect(issue.severity).toBe('error');
    expect(issue.ruleId).toBe('test-rule');
    expect(issue.message).toBe('Test message');
    expect(issue.elementPath).toBe('div > img');
  });
});
