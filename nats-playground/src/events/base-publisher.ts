import { Subjects } from "./subjects";
import { Stan } from "node-nats-streaming";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  public publish(data: T['data']) :Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Published to ', this.subject);
        return resolve();
      });
    });
  }
}