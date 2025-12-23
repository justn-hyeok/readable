import { VirtualElement } from '@domain/entities/VirtualElement';

export class BrowserDOMAdapter implements VirtualElement {
  constructor(private readonly nativeElement: HTMLElement) {}

  get tagName(): string {
    return this.nativeElement.tagName;
  }

  get id(): string {
    return this.nativeElement.id;
  }

  get className(): string {
    return this.nativeElement.className;
  }

  getAttribute(name: string): string | null {
    return this.nativeElement.getAttribute(name);
  }

  hasAttribute(name: string): boolean {
    return this.nativeElement.hasAttribute(name);
  }

  setAttribute(name: string, value: string): void {
    this.nativeElement.setAttribute(name, value);
  }

  getProperty<T>(name: string): T {
    // Safety cast: accessing arbitrary properties on the element
    return (this.nativeElement as any)[name];
  }

  contains(element: VirtualElement): boolean {
    if (element instanceof BrowserDOMAdapter) {
      return this.nativeElement.contains(element.nativeElement);
    }
    return false;
  }

  getTextContent(): string {
    return this.nativeElement.textContent || '';
  }

  getParent(): VirtualElement | null {
    const parent = this.nativeElement.parentElement;
    return parent ? new BrowserDOMAdapter(parent) : null;
  }

  addEventListener(event: string, handler: (e: any) => void): void {
    this.nativeElement.addEventListener(event, handler);
  }

  /**
   * Information helper for debugging or interfacing with UI.
   * Not part of the core VirtualElement interface strictly, but useful for concrete usage.
   */
  public getNativeElement(): HTMLElement {
    return this.nativeElement;
  }
}
