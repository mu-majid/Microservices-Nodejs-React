import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting to NATS Server.');
    }

    return this._client;
  }

  public connect (clusterId: string, clientId: string, url: string): Promise<void> {

    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected To NATS');
        resolve();
      });

      this.client.on('error', (e) => {
        console.log('Failed To Connect to NATS ', e);
        reject(e);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();