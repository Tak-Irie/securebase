export type GuardResult = {
  succeeded: boolean;
  message: string;
};

export type GuardArgument = {
  argument: unknown;
  argumentName: string;
};

export type GuardArgumentCollection = GuardArgument[];
/**
 * @class propsがtruthyかどうかを確認するクラス
 * @description 必要ないかも
 */
export class Guard {
  /**
  * @method {succeeded:boolean, message: string}のみを返す
  * @description propsは返さない
  */
  public static falsyCheck(props: GuardArgument): GuardResult {
    if (!props) {
      return {
        succeeded: false,
        message: `入力されていないか、不正な値です。`,
      };
    }

    return { succeeded: true, message: '正常な値です' };
  }

  public static collectionFalsyCheck(
    args: GuardArgumentCollection,
  ): GuardResult {
    args
      .map((arg) =>
        this.falsyCheck({
          argument: arg.argument,
          argumentName: arg.argumentName,
        }),
      )
      .find(({ succeeded }) => succeeded === false);

    return { succeeded: true, message: 'fine' };
  }

  public static combine(guardResults: GuardResult[]): GuardResult {
    guardResults.find(({ succeeded }) => succeeded === false);

    return { succeeded: true, message: 'fine' };
  }

  // public static isOneOf(
  //   value: any,
  //   validValues: any[],
  //   argumentName: string,
  // ): GuardResult {
  //   // let isValid = false;
  //   // for (const validValue of validValues) {
  //   //   if (value === validValue) {
  //   //     isValid = true;
  //   /   }
  //   // }

  //   // if (isValid) {
  //   //   return { succeeded: true };
  //   // }

  //   return {
  //     succeeded: false,
  //     message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
  //       validValues,
  //     )}. Got "${value}".`,
  //   };
  // }

  //   public static inRange(
  //     num: number,
  //     min: number,
  //     max: number,
  //     argumentName: string,
  //   ): GuardResult {
  //     const isInRange = num >= min && num <= max;
  //     if (!isInRange) {
  //       return {
  //         succeeded: false,
  //        message: `${argumentName} is not within range ${min} to ${max}.`,
  //       };
  //     }

  //     return { succeeded: true };
  //   }

  //   public static allInRange(
  //     numbers: number[],
  //     min: number,
  //     max: number,
  //     argumentName: string,
  //   ): GuardResult {
  //     let failingResult: GuardResult = null;
  //     for (const num of numbers) {
  //       const numIsInRangeResult = this.inRange(num, min, max, argumentName);
  //       if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
  //     }  //     if (failingResult) {
  //       return {
  //         succeeded: false,
  //         message: `${argumentName} is not within the range.`,
  //       };
  //     }

  //     return { succeeded: true };
  //   }
}
