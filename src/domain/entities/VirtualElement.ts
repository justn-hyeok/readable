/**
 * DOM 요소의 가상 표현
 * 실제 DOM API에 의존하지 않는 순수 데이터 구조
 */

export interface VirtualElement {
  readonly tagName: string;
  readonly attributes: Record<string, string>;
  readonly textContent: string;
  readonly children: VirtualElement[];
  readonly path: string;
}

export class VirtualElementEntity implements VirtualElement {
  readonly tagName: string;
  readonly attributes: Record<string, string>;
  readonly textContent: string;
  readonly children: VirtualElement[];
  readonly path: string;

  constructor(data: VirtualElement) {
    this.tagName = data.tagName;
    this.attributes = { ...data.attributes };
    this.textContent = data.textContent;
    this.children = [...data.children];
    this.path = data.path;
  }

  getAttribute(name: string): string | undefined {
    return this.attributes[name];
  }

  hasAttribute(name: string): boolean {
    return name in this.attributes;
  }
}
