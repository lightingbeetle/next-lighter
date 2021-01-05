// TODO: useBreakpoint hook can be probaly useful here

import breakpointsFromSCSS from "./export.scss";

export type BreakpointsMap = {
  /** Breakpoint name */
  [x: string]: string;
};

function getBreakpointsMap(): BreakpointsMap {
  return Object.keys(breakpointsFromSCSS).reduce((acc, breakpoint) => {
    const [, name] = breakpoint.split("-");

    acc[name] = breakpointsFromSCSS[breakpoint];

    return acc;
  }, {});
}

export const breakpoints = getBreakpointsMap();

export function breakpoint(name: string, _breakpoints = breakpoints): string {
  const value = _breakpoints[name];

  if (!value) {
    throw new Error(`Breakpoint '${name}' is not defined in $breakpoints`);
  }

  return value;
}
