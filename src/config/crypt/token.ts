import { randomBytes } from 'crypto';

export function generateToken(size: number): Promise<string> {
  return new Promise((resolve) => {
    randomBytes(size / 2, (_, buffer) => {
      resolve(buffer.toString('hex').toUpperCase());
    });
  });
}
