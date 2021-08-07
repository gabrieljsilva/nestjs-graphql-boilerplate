import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  Connection,
} from 'typeorm';

import { Token } from '../../entities';

import { hash } from '../../../config/crypt';

@EventSubscriber()
export class TokenSubscriber implements EntitySubscriberInterface<Token> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Token;
  }

  async beforeInsert(event: InsertEvent<Token>) {
    event.entity.token = await hash(event.entity.token);
  }
}
