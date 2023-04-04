export const repeat = (n: number, pattern: any[]) => {
  return [...Array(n)].reduce((sum) => sum.concat(pattern), []);
};
