/**
 * 이미지 alt 속성 검사 규칙
 * 순수 비즈니스 로직만 포함
 */

import type { AccessibilityRule } from '../../interfaces/AccessibilityRule';
import type { VirtualElement } from '../../entities/VirtualElement';
import { IssueEntity, type Issue } from '../../entities/Issue';

export class ImageAltRule implements AccessibilityRule {
  readonly id = 'image-alt';
  readonly description = 'Images must have alt text';

  check(element: VirtualElement): Issue | null {
    if (element.tagName.toLowerCase() !== 'img') {
      return null;
    }

    const alt = element.attributes['alt'];

    if (alt === undefined) {
      return new IssueEntity({
        severity: 'error',
        ruleId: this.id,
        message: 'Image missing alt attribute',
        elementPath: element.path,
        suggestedFix: 'Add an alt attribute describing the image',
      });
    }

    if (alt.trim() === '') {
      return new IssueEntity({
        severity: 'warning',
        ruleId: this.id,
        message: 'Image has empty alt attribute',
        elementPath: element.path,
        suggestedFix: 'Provide descriptive alt text or use alt="" for decorative images',
      });
    }

    return null;
  }
}
