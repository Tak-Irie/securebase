import { IDomainEvent } from './IDomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityId } from '../UniqueEntityId';

type callBack = (event: IDomainEvent) => void;

export class DomainEvents {
  private static handlersMap: { [key: string]: [value: callBack] };
  private static markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event),
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>,
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityId,
  ): AggregateRoot<any> | undefined {
    this.markedAggregates.find((aggregate) => {
      if (aggregate.equals(id)) return aggregate;

      return undefined;
    });

    return undefined;
  }

  public static dispatchEventsForAggregate(id: UniqueEntityId): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static registerDomainEvents(
    eventClassName: string,
    callback: callBack,
  ): void {
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;
    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      const { handlers } = this.handlersMap;
      handlers.map((handler) => handler(event));
    }
  }
}
