import colorsFromSCSS from "./export.scss";

export type ColorsMap = {
  /** Color name */
  [x: string]: {
    /** Color shade and value */
    [x: number]: string;
  };
};

function getColorsMap(): ColorsMap {
  const colorsMap = Object.keys(colorsFromSCSS).reduce((acc, color) => {
    const [, name, shade] = color.split("-");

    if (!acc[name]) {
      acc[name] = {};
    }

    acc[name][parseInt(shade)] = colors[color];

    return acc;
  }, {});

  return colorsMap;
}

export const colors = getColorsMap();

export function color(name: string, shade = 500, _colors = colors): string {
  if (!_colors[name]) {
    throw new Error(`Color '${name}' is not defined in $colors`);
  }

  if (!_colors[name][shade]) {
    throw new Error(
      `Color's '${name}' shade '${shade}' is not defined in $colors`
    );
  }

  return `--color-${name}-${shade}`;
}

export function colorHex(name: string, shade = 500, _colors = colors): string {
  if (!_colors[name]) {
    throw new Error(`Color '${name}' is not defined in $colors`);
  }

  const value = _colors[name][shade];

  if (!value) {
    throw new Error(
      `Color's '${name}' shade '${shade}' is not defined in $colors`
    );
  }

  return value;
}
