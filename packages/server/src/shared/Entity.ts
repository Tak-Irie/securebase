import { UniqueEntityId } from './UniqueEntityId';
import { Identifier } from './Identifier';

/**
 * @constructor public readonly props:T @constructor UniqueEntityId
 * @method equals
 */
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

/**
 * 抽象Entityクラス
 *
 */
export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  private identifier: Identifier;

  constructor(public readonly props: T, id?: UniqueEntityId) {
    this._id = id || new UniqueEntityId();
    this.props = props;
  }

  public equals(object?: Entity<T> | UniqueEntityId): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.identifier.identifyEntity(object._id, this._id);
  }
}
