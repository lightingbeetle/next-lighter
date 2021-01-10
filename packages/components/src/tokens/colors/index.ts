import scssVarsToMap from "../../utils/scssVarsToMap";
// @ts-ignore Microbundle fails on this, but otherwise it seems working
import colorsFromSCSS from "./export.module.scss";

export const colors = scssVarsToMap(colorsFromSCSS);

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
