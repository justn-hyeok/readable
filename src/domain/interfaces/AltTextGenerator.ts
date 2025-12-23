/**
 * 대체 텍스트 생성 인터페이스
 * AI 모델 구현체가 준수해야 하는 계약
 */

export interface ImageData {
  readonly url: string;
  readonly width?: number;
  readonly height?: number;
}

export interface AltTextGenerator {
  generateAltText(image: ImageData): Promise<string>;
}
