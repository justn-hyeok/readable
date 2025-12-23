import { IScanRule } from '@domain/strategies/RuleInterfaces';
import { VirtualElement, Issue } from '@domain/entities/VirtualElement';

export class ImageAltMissingRule implements IScanRule {
  readonly ruleId = 'image-alt-missing';

  evaluate(element: VirtualElement): Issue | null {
    // Only check <img> tags
    if (element.tagName !== 'IMG') {
      return null;
    }

    // P0: Missing 'alt' attribute entirely
    if (!element.hasAttribute('alt')) {
      return new Issue(
        'Image missing alt attribute',
        'P0',
        element,
        this.ruleId
      );
    }

    // P1: Empty alt text but image seems significant (heuristic: width > 50px)
    // Note: 'naturalWidth' is a property, not an attribute.
    const altValue = element.getAttribute('alt');
    const naturalWidth = element.getProperty<number>('naturalWidth') || 0;

    if (altValue === '' && naturalWidth > 50) {
      return new Issue(
        'Non-decorative image has empty alt text',
        'P1',
        element,
        this.ruleId
      );
    }

    return null;
  }
}
