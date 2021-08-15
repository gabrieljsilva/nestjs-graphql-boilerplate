import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  Connection,
} from 'typeorm';

import { Credentials } from '../../entities';

import { hash } from '../../../config/crypt';

@EventSubscriber()
export class CredentialsSubscriber
  implements EntitySubscriberInterface<Credentials>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Credentials;
  }

  async beforeInsert(event: InsertEvent<Credentials>) {
    event.entity.password = await hash(event.entity.password);
  }
}
