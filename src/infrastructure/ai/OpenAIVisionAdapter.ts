/**
 * OpenAI Vision API 어댑터
 * 실제 구현은 API 키 설정 후 진행
 */

import type { AltTextGenerator, ImageData } from '../../domain/interfaces/AltTextGenerator';

export class OpenAIVisionAdapter implements AltTextGenerator {
  constructor(private readonly apiKey: string) {}

  async generateAltText(image: ImageData): Promise<string> {
    // TODO: Implement OpenAI Vision API call
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4-vision-preview',
    //     messages: [
    //       {
    //         role: 'user',
    //         content: [
    //           { type: 'text', text: 'Describe this image for alt text' },
    //           { type: 'image_url', image_url: { url: image.url } }
    //         ]
    //       }
    //     ],
    //     max_tokens: 300,
    //   }),
    // });

    return `[AI-generated alt text for ${image.url}]`;
  }
}
