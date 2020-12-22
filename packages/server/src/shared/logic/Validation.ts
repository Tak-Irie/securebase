// type inputProps = {
//   minLength?: number;

// };

export class Validation {
  public static greaterThan(minLength: number, inputValue: string): boolean {
    return minLength > inputValue.length;
  }

  public static smallerThan(maxLength: number, inputValue: string): boolean {
    return inputValue.length > maxLength;
  }
}
