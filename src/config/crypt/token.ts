import { randomInt } from 'crypto';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateRandomToken(size: number): Promise<string> {
  return new Promise((resolve) => {
    let token = '';
    do token += chars[randomInt(chars.length)];
    while (token.length < size);

    resolve(token);
  });
}
