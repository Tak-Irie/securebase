import { UniqueEntityId } from './UniqueEntityId';

/**
 * エンティティの一意性を確認する
 * UniqueEntityIdにのみ移譲される。
 */
export class Identifier {
  identifyEntity(objectId: UniqueEntityId, ownId: UniqueEntityId): boolean {
    return objectId === ownId;
  }
}
