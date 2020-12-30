export class Validation {
  public static valueGreaterThanLimit(minLength: number, inputValue: string): boolean {
    return inputValue.length > minLength;
  }

  public static valueLessThanLimit(maxLength: number, inputValue: string): boolean {
    return maxLength > inputValue.length;
  }
}
