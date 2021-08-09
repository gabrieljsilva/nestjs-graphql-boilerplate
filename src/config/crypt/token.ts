import { randomInt } from 'crypto';

export function generateToken(size: number): Promise<string> {
  return new Promise((resolve) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let token = '';
    do token += chars[randomInt(chars.length)];
    while (token.length < size);

    resolve(token);
  });
}
