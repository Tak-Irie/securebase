import { IDomainEvent } from '../../../../shared/events/IDomainEvent';
import { UniqueEntityId } from '../../../../shared/UniqueEntityId';
import { User } from '../User';

export class UserCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityId {
    return this.user.id;
  }
}
