// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deferCallback = <T extends (...args: any[]) => any>(f: T) => (
  ...args: Parameters<T>
): ReturnType<T> => f(...args);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeDeferredCallback = <T extends (...args: any[]) => any>(
  f: T,
) => (...args: Parameters<T>) => (): ReturnType<T> => f(...args);
