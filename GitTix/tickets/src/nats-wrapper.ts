import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  public connect (clusterId: string, clientId: string, url: string) {

    this._client = nats.connect(clientId, clientId, { url });
    return new Promise((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log('Connected To NATS');
        resolve();
      });

      this._client!.on('error', (e) => {
        console.log('Failed To Connect to NATS ', e);
        reject(e);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();