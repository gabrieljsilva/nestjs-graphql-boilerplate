import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  Connection,
} from 'typeorm';

import { Access } from 'app/entities';

import { hash } from 'config/crypt';

@EventSubscriber()
export class AccessSubscriber implements EntitySubscriberInterface<Access> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Access;
  }

  async beforeInsert(event: InsertEvent<Access>) {
    event.entity.password = await hash(event.entity.password);
  }
}
