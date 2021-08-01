export function objectToArray(obj: { [key: string]: any }) {
  return Object.entries(obj).map(([, value]) => value);
}
