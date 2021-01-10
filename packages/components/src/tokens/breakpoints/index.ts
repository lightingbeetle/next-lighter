// TODO: useBreakpoint hook can be probaly useful here

import scssVarsToMap from "../../utils/scssVarsToMap";
// @ts-ignore Microbundle fails on this, but otherwise it seems working
import breakpointsFromSCSS from "./export.module.scss";

export const breakpoints = scssVarsToMap(breakpointsFromSCSS);

export function breakpoint(name: string, _breakpoints = breakpoints): string {
  const value = _breakpoints[name];

  if (!value) {
    throw new Error(`Breakpoint '${name}' is not defined in $breakpoints`);
  }

  return value;
}
