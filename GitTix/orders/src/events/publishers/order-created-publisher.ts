import { Publisher, OrderCreatedEvent, Subjects } from '@mmkgittix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;

}