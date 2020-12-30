import { IDomainEvent } from '../events/IDomainEvent';
// eslint-disable-next-line import/no-cycle
import { DomainEvents } from '../events/DomainEvents';
import { UniqueEntityId } from './UniqueEntityId';
import { Entity } from './Entity';

/**
 * @class 集約ルート
 * @description 通常のEntity機能に加えて、ドメインイベントを発火する機能を持つ
 * @method addDomainEvent, clearEvents, logDomainEventAdded
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }
}
