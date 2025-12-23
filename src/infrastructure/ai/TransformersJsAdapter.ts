/**
 * Transformers.js 어댑터
 * 브라우저 내 로컬 AI 모델 사용
 */

import type { AltTextGenerator, ImageData } from '../../domain/interfaces/AltTextGenerator';

export class TransformersJsAdapter implements AltTextGenerator {
  async generateAltText(image: ImageData): Promise<string> {
    // TODO: Implement Transformers.js image captioning
    // const { pipeline } = await import('@xenova/transformers');
    // const captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
    // const output = await captioner(image.url);
    // return output[0].generated_text;

    return `[Local AI alt text for ${image.url}]`;
  }
}
