
/**
 * @class 統一された"型"のリザルトを返すためのクラス
 * @description throw new Error を使わずにエラーハンドリングできる
 */
export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error: string;
  public readonly value: T;

  public constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        '不正なオペレーションが検出されました、あり得ない値の組合わせです',
      );
    }
    if (!isSuccess && !error) {
      throw new Error('不正なオペレーションが検出されました、あり得ない値の組合わせです');
    }
    if (error) this.error = error;
    if (value) this.value = value;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  public static verifyResult<U>(result: Result<U>): Result<U> {
    if(result.isFailure){
      return Result.fail<U>(result.getErrorValue())
    }

    return Result.success<U>(result.getValue())
  }

/**
* @desc Result{isFailure: true, error:string value: fail<U>}
*/
  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public getErrorValue(): string {
    return this.error;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, '', value);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      this.getErrorValue()}

    return this.value;
  }


public static verifyResults<U>(results: Result<U>[]): Result<U> {
  const arrayResults = Object.values(results)
  const findErr =  arrayResults.find(({ isFailure }) => isFailure === true);

  return findErr || Result.success<U>();
  }
}
