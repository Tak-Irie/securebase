interface ValueObjectProps {
  [index: string]: unknown;
}

/**
 * コンストラクターでprops:Tを全てpublic readonlyにする
 */
export abstract class ValueObject<T extends ValueObjectProps> {
  constructor(public readonly props: T) {
    this.props = { ...props };
  }

  public equals(arg?: ValueObject<T>): boolean {
    if (!arg) return false;

    if (arg.props === undefined) return false;

    return JSON.stringify(this.props) === JSON.stringify(arg.props);
  }
}
