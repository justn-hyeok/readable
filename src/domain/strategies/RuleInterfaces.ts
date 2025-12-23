import { VirtualElement } from '@domain/entities/VirtualElement';
import { Issue } from '@domain/entities/VirtualElement'; // Fix: Issue is exported from VirtualElement file in previous step, or should have been separate. Check imports.
// Actually, earlier I put Issue in VirtualElement.ts file, which is fine for now but I'll import carefully.
// To be clean, I should've separated them. I will assume they are in the same file or I will fix the import. 
// Re-checking previous step: defined `Issue` in `src/domain/entities/VirtualElement.ts`
// So the import `import { Issue } from '@domain/entities/VirtualElement';` is correct.

export interface IScanRule {
  /**
   * Unique identifier for the rule (e.g., 'img-alt-missing').
   */
  readonly ruleId: string;

  /**
   * Checks the given element against the rule logic.
   * @returns An Issue object if violation found, null otherwise.
   */
  evaluate(element: VirtualElement): Issue | null;
}

export interface ITransformRule {
  /**
   * Unique identifier for the rule this transform fixes (should match ScanRule id usually).
   */
  readonly ruleId: string;

  /**
   * Applies the fix to the element associated with the issue.
   * @returns true if fix was applied, false if it failed or wasn't applicable.
   */
  apply(issue: Issue): Promise<boolean>;
}
