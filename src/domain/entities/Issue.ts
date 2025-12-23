/**
 * 접근성 이슈를 나타내는 도메인 엔티티
 * 외부 의존성 없는 순수 TypeScript
 */

export type IssueSeverity = 'error' | 'warning' | 'info';

export interface Issue {
  readonly id: string;
  readonly severity: IssueSeverity;
  readonly ruleId: string;
  readonly message: string;
  readonly elementPath: string;
  readonly suggestedFix?: string;
  readonly createdAt: Date;
}

export class IssueEntity implements Issue {
  readonly id: string;
  readonly severity: IssueSeverity;
  readonly ruleId: string;
  readonly message: string;
  readonly elementPath: string;
  readonly suggestedFix?: string;
  readonly createdAt: Date;

  constructor(data: Omit<Issue, 'id' | 'createdAt'> & { id?: string; createdAt?: Date }) {
    this.id = data.id ?? this.generateId();
    this.severity = data.severity;
    this.ruleId = data.ruleId;
    this.message = data.message;
    this.elementPath = data.elementPath;
    this.suggestedFix = data.suggestedFix;
    this.createdAt = data.createdAt ?? new Date();
  }

  private generateId(): string {
    return `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
