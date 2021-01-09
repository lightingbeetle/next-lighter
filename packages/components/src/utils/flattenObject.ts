export default function flattenObject(
  obj: Object,
  prefix = "",
  res = {}
): { [x: string]: any } {
  return Object.entries(obj).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (typeof val === "object") {
      flattenObject(val, `${k}.`, r);
    } else {
      res[k] = val;
    }
    return r;
  }, res);
}
