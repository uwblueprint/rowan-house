export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "Unknown error occurred.";
};

// https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking
export const assertNever = (x: never): never => {
  throw new Error(`Unexpected value/type: ${x}`);
};
