import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@mmkgittix/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.EXPIRATION_COMPLETE = Subjects.EXPIRATION_COMPLETE;
}
