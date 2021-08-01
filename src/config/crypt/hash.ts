import * as bcrypt from 'bcrypt';

export async function hash(string: string) {
  return bcrypt.hash(string, 8);
}

export async function compare(string: string, hash: string) {
  return bcrypt.compare(string, hash);
}
