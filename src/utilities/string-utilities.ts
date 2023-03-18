export function onlyUniqueFilter(value: any, index: number, self: any[]) {
  return self.map(v => v.toLowerCase()).indexOf(value.toLowerCase()) === index;
}

export const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const isValidEmail = (value: string) => {
  return emailRegex.test(value);
}