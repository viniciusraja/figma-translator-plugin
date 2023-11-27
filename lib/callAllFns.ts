type Fn<T extends any[] = any[]> = (
  ...args: Partial<T> extends T ? T : (T | undefined)[]
) => void;

export type ExecuteAllFn<T extends any[]> = (...args: T) => void;

const callAllFns = function <T extends any[]>(
  ...fns: Array<Fn<T>>
): ExecuteAllFn<T> {
  return function executeAll(...args: T): void {
    fns.forEach(fn => fn?.(...args));
  };
};

export default callAllFns;
