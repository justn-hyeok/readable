import { ITransformRule } from '@domain/strategies/RuleInterfaces';
import { Issue } from '@domain/entities/VirtualElement';
import { IAIService } from '@domain/ports/IAIService';

export class GenerateAltTextRule implements ITransformRule {
  readonly ruleId = 'image-alt-missing';

  constructor(private readonly aiService: IAIService) {}

  async apply(issue: Issue): Promise<boolean> {
    const element = issue.element;

    // Double check if it's still an issue or if we can handle it
    if (element.hasAttribute('alt') && element.getAttribute('alt') !== '') {
      return false; // Already has alt text, maybe fixed by someone else
    }

    const src = element.getAttribute('src');
    if (!src) return false;

    try {
      // Call AI Service via Port
      const generatedAlt = await this.aiService.generateImageCaption(src);
      
      if (generatedAlt) {
        element.setAttribute('alt', generatedAlt);
        // Mark visually that it was AI generated? (Optional, maybe via data attribute)
        element.setAttribute('data-aura-generated', 'true');
        return true;
      }
    } catch (error) {
      console.error('Failed to generate alt text', error);
      // Fallback: filename based
      const filename = src.split('/').pop() || 'image';
      element.setAttribute('alt', `Image: ${filename}`);
      return true;
    }

    return false;
  }
}
