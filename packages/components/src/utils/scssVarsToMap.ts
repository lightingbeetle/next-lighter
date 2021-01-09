type ValueOrObject<T> =
  | T
  | {
      [x: string]: ValueOrObject<T>;
    };
export type SCSSVarsMap = ValueOrObject<string>;

const mutateDeepObject = (obj, props, value) => {
  const lastKey = props.pop();
  const lastObj = props.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
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
