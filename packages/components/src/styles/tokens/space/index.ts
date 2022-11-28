import { rem } from "../..";
import scssVarsToMap from "../../../utils/scssVarsToMap";
import spacesFromSCSS from "./export.module.scss";

export const spaces = scssVarsToMap(spacesFromSCSS);

export function spaceValue(name: string, _spaces = spaces): string {
  const value = _spaces[name];

  if (!value) {
    throw new Error(`Space '${name}' is not defined in $spaces`);
  }

  return value;
}

export function space(name: string, _spaces = spaces): string {
  return rem(spaceValue(name, _spaces));
}
