import { Subscriber } from './../components/subscriptions/subscription-types';
export function onlyUniqueFilter(value: any, index: number, self: any[]) {
  return self.map(v => v.toLowerCase()).indexOf(value.toLowerCase()) === index;
}

export const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const isValidEmail = (value: string) => {
  return emailRegex.test(value);
}

function base64Encode(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const base64String = Buffer.from(data).toString('base64');
  return base64String;
}

function base64Decode(encodedStr: string): string {
  const data = Buffer.from(encodedStr, 'base64');
  const decoder = new TextDecoder();
  const decodedString = decoder.decode(data);
  return decodedString;
}



export const encodeCookie = (obj: Record<string, any>) : string => {
  const jstr = JSON.stringify(obj);
  const enc = base64Encode(jstr);
  return enc;
}

export const decodeCookie = (encodedStr: string) : Partial<Subscriber> => {
  const dec = base64Decode(encodedStr);
  const json = JSON.parse(dec);
  return json;
}