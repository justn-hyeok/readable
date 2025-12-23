import { IScanRule } from '@domain/strategies/RuleInterfaces';
import { VirtualElement, Issue } from '@domain/entities/VirtualElement';

export class ScannerService {
  private rules: IScanRule[] = [];

  constructor(initialRules: IScanRule[] = []) {
    this.rules = initialRules;
  }

  registerRule(rule: IScanRule): void {
    this.rules.push(rule);
  }

  /**
   * Scans a single element against all registered rules.
   */
  scanElement(element: VirtualElement): Issue[] {
    const issues: Issue[] = [];
    for (const rule of this.rules) {
      const issue = rule.evaluate(element);
      if (issue) {
        issues.push(issue);
      }
    }
    return issues;
  }

  /**
   * Recursively scans the entire tree starting from the root element.
   * NOTE: In a real browser, we might use a TreeWalker for better performance than recursion.
   */
  scanTree(root: VirtualElement): Issue[] {
    let allIssues: Issue[] = [];

    // Check the root itself
    allIssues.push(...this.scanElement(root));

    // Abstract way to traverse children? 
    // VirtualElement interface currently mostly defines checks. 
    // To support tree traversal, we'd need a way to get children from VirtualElement.
    // For now, let's assume the consumer (Injector) might traverse the DOM 
    // and pass individual elements to scanElement, OR we extend VirtualElement to have `children`.
    
    // BUT, the most performant way in DOM is usually `element.querySelectorAll('*')` 
    // or TreeWalker, which resides in the Adapter side.
    
    // Strategy: The service focuses on logic. The orchestration of "which nodes to visit"
    // often belongs to the Infrastructure layer (Injector) which feeds nodes to the Service,
    // OR we inject a `ITreeTraverser` into the service.
    
    // For this boilerplate, I'll keep it simple: The Injector will loop over DOM nodes 
    // and call `scanElement`. This Service just provides the logic for "Checking a Node".
    
    return allIssues;
  }
}
