/**
 * Alt 텍스트 자동 생성 변환 규칙
 * AI 생성 로직을 포함하지 않고, 조율만 수행
 */

import type { VirtualElement } from '../../entities/VirtualElement';
import type { AltTextGenerator } from '../../interfaces/AltTextGenerator';

export class AltTextTransformationRule {
  constructor(private readonly generator: AltTextGenerator) {}

  async shouldTransform(element: VirtualElement): Promise<boolean> {
    if (element.tagName.toLowerCase() !== 'img') {
      return false;
    }

    const alt = element.attributes['alt'];
    return alt === undefined || alt.trim() === '';
  }

  async generateAltText(element: VirtualElement): Promise<string> {
    const src = element.attributes['src'];
    if (!src) {
      return 'Image without source';
    }

    const width = element.attributes['width'] ? parseInt(element.attributes['width'], 10) : undefined;
    const height = element.attributes['height'] ? parseInt(element.attributes['height'], 10) : undefined;

    return this.generator.generateAltText({
      url: src,
      width,
      height,
    });
  }
}
