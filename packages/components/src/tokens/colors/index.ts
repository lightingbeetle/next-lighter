import colors from "./export.scss";

export function color(name: string, shade = 500, _colors = colors): string {
  const value = _colors[`color-${name}-${shade}`];

  if (!value) {
    throw new Error(`Color '${name}.${shade}' is not defined in $colors`);
  }

  return `--color-${name}-${shade}`;
}

export function colorHex(name: string, shade = 500, _colors = colors): string {
  const value = _colors[`color-${name}-${shade}`];

  if (!value) {
    throw new Error(`Color '${name}.${shade}' is not defined in $colors`);
  }

  return value;
}

export { colors };
