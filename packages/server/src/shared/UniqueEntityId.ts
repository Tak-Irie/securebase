import { ulid } from 'ulid';
/**
 * 一意な識別子"Id"をプライベートメンバーに持つ。
 * 引数にIdを与えなければ自動で生成する。
 *
 */
export class UniqueEntityId {
  constructor(private id?: string) {
    if (!id) this.id = ulid();
    this.id = id;
  }
}

export const fnUniqueEntityId = (): string => {
  const id = ulid();

  return id;
};
