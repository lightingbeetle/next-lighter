import { rem } from "../../styles";
import spacesFromSCSS from "./export.scss";

export type SpacesMap = {
  /** Breakpoint name */
  [x: string]: string;
};

function getSpacessMap(): SpacesMap {
  return Object.keys(spacesFromSCSS).reduce((acc, space) => {
    const [, name] = space.split("-");

    acc[name] = spacesFromSCSS[space];

    return acc;
  }, {});
}

export const spaces = getSpacessMap();

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
