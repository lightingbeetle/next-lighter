type ValueOrObject<T> =
  | T
  | {
      [x: string]: ValueOrObject<T>;
    };
export type SCSSVarsMap = ValueOrObject<string>;

const mutateDeepObject = (
  obj: { [key: string]: unknown },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any[],
  value: string | undefined
) => {
  const lastKey = props.pop();
  const lastObj = props.reduce(
    (obj, key: string) => (obj[key] = obj[key] || {}),
    obj
  );
  lastObj[lastKey] = value;
};

export default function scssVarsToMap(vars: {
  [x: string]: string;
}): SCSSVarsMap {
  return Object.keys(vars).reduce((acc, name) => {
    const [, ...props] = name.split("-");

    mutateDeepObject(acc, props, vars[name]);

    return acc;
  }, {});
}
