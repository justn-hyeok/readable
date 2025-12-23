/**
 * 브라우저 DOM 어댑터 구현
 * 실제 DOM API를 VirtualElement로 변환
 */

import type { DomAdapter } from '../../domain/interfaces/DomAdapter';
import { VirtualElementEntity, type VirtualElement } from '../../domain/entities/VirtualElement';

export class BrowserDomAdapter implements DomAdapter {
  querySelector(selector: string): VirtualElement | null {
    const element = document.querySelector(selector);
    return element ? this.toVirtualElement(element) : null;
  }

  querySelectorAll(selector: string): VirtualElement[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(el => this.toVirtualElement(el));
  }

  setAttribute(path: string, name: string, value: string): void {
    const element = this.findElementByPath(path);
    if (element) {
      element.setAttribute(name, value);
    }
  }

  getAttribute(path: string, name: string): string | null {
    const element = this.findElementByPath(path);
    return element ? element.getAttribute(name) : null;
  }

  private toVirtualElement(element: Element): VirtualElement {
    const attributes: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      attributes[attr.name] = attr.value;
    }

    const children = Array.from(element.children).map(child => this.toVirtualElement(child));

    return new VirtualElementEntity({
      tagName: element.tagName,
      attributes,
      textContent: element.textContent || '',
      children,
      path: this.getElementPath(element),
    });
  }

  private getElementPath(element: Element): string {
    const path: string[] = [];
    let current: Element | null = element;

    while (current && current !== document.body) {
      const parent = current.parentElement;
      if (!parent) break;

      const siblings = Array.from(parent.children);
      const index = siblings.indexOf(current);
      path.unshift(`${current.tagName.toLowerCase()}[${index}]`);
      current = parent;
    }

    return path.join(' > ');
  }

  private findElementByPath(path: string): Element | null {
    // Simplified path finder - production would need more robust implementation
    const parts = path.split(' > ');
    let current: Element = document.body;

    for (const part of parts) {
      const match = part.match(/^(.+)\[(\d+)\]$/);
      if (!match) return null;

      const [, tagName, indexStr] = match;
      const index = parseInt(indexStr, 10);
      const children = Array.from(current.children).filter(
        child => child.tagName.toLowerCase() === tagName.toLowerCase()
      );

      if (index >= children.length) return null;
      current = children[index];
    }

    return current;
  }
}
