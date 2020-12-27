import { Publisher, OrderCancelledEvent, Subjects } from '@mmkgittix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;

}