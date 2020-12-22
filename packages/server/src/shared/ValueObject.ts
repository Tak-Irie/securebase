interface ValueObjectProps {
  [index: string]: unknown;
}

/**
 * コンストラクターでprops:Tを全てパブリックメンバーにする
 */
export abstract class ValueObject<T extends ValueObjectProps> {
  constructor(public props: T) {}

  public equals(arg?: ValueObject<T>): boolean {
    if (!arg) return false;

    if (arg.props === undefined) return false;

    return JSON.stringify(this.props) === JSON.stringify(arg.props);
  }
}
