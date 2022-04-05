export function onlyUniqueFilter(value: any, index: number, self: any[]) {
  return self.map(v => v.toLowerCase()).indexOf(value.toLowerCase()) === index;
}