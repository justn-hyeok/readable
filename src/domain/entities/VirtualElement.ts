/**
 * Represents the severity priority of an accessibility issue.
 * P0: Critical (Must fix immediately)
 * P1: Major (Should fix)
 * P2: Minor (Good to fix)
 */
export type Priority = 'P0' | 'P1' | 'P2';

/**
 * Domain entity representing an identified accessibility issue.
 */
export class Issue {
  constructor(
    public readonly message: string,
    public readonly priority: Priority,
    public readonly element: VirtualElement, // Reference back to the faulty element
    public readonly ruleId: string
  ) {}
}

/**
 * Abstraction over a DOM element.
 * 
 * This interface allows our Rules to interact with elements without knowing
 * if they are real browser DOM nodes, virtual nodes from a JSDOM environment (for testing),
 * or simple mock objects.
 */
export interface VirtualElement {
  readonly tagName: string;
  readonly id: string;
  readonly className: string;
  
  /**
   * Retrieves an attribute value. Returns null if not present.
   */
  getAttribute(name: string): string | null;

  /**
   * Checks if an attribute exists.
   */
  hasAttribute(name: string): boolean;

  /**
   * Sets an attribute value. Used by Transform rules.
   */
  setAttribute(name: string, value: string): void;

  /**
   * Access specific properties that might not be attributes (e.g., naturalWidth, tabIndex).
   * We use a generic getProperty to keep the interface clean while allowing access to needed DOM props.
   */
  getProperty<T>(name: string): T;

  /**
   * Checks if the element contains another element.
   */
  contains(element: VirtualElement): boolean;

  /**
   * Returns the text content of the element.
   */
  getTextContent(): string;
  
  /**
   * Returns the parent element wrapped in VirtualElement, or null if none.
   */
  getParent(): VirtualElement | null;

  /**
   * Allows attaching event listeners (abstracted).
   * In a real DOM, this adds an event listener.
   */
  addEventListener(event: string, handler: (e: any) => void): void;
}
