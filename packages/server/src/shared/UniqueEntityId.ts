import { ulid } from 'ulid';
/**
 * 一意な識別子"Id"をプライベートメンバーに持つ。
 * 引数にIdを与えなければ自動で生成する。
 *
 */
export class UniqueEntityId {
  constructor(private id?: string) {
    if (id === undefined) this.id = ulid();
    else {
      this.id = id;
    }
  }

  // temporary shit code
  public getId(): string {
    if (this.id === undefined) {
      return 'error';
    }

    return this.id;
  }
}
