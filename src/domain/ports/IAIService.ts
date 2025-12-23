export interface IAIService {
  /**
   * Generates a description for an image.
   * @param imageUrl The src of the image or base64 data.
   * @param context Optional context about the page or surrounding text.
   */
  generateImageCaption(imageUrl: string, context?: string): Promise<string>;
}
