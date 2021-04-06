function prefixClass(className?: string, prefix = "-") {
  return className ? `${`${prefix}${className}`}` : "";
}

export function getClassModsFromObject(
  prefix: string,
  mod: object,
  postfix?: string
) {
  return Object.keys(mod)
    .map((key) => {
      switch (typeof mod[key]) {
        case "boolean":
          // prettier inserts new lines and fucks up output
          // prettier-ignore
          return `${prefix}${key !== 'xs' ? `--${key}` : '-'}${prefixClass(postfix)}`;
        case "string":
        case "number":
          // prettier inserts new lines and fucks up output
          // prettier-ignore
          return `${prefix}${key !== 'xs' ? `--${key}` : '-'}${prefixClass(mod[key])}${prefixClass(postfix)}`;
        default:
          return null;
      }
    })
    .join(" ");
}

export function genResponsiveClasses(
  prefix: string,
  mod: boolean | string | number | object,
  postfix?: string
) {
  return [
    typeof mod === "boolean" ? `${prefix}${prefixClass(postfix, "--")}` : null,
    mod !== null && typeof mod === "object"
      ? getClassModsFromObject(prefix, mod, postfix)
      : null,
    {
      [`${prefix}--${mod}${prefixClass(postfix)}`]:
        typeof mod === "string" || typeof mod === "number",
    },
  ];
}
