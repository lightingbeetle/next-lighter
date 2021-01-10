import scssVarsToMap from "../../utils/scssVarsToMap";
// @ts-ignore Microbundle fails on this, but otherwise it seems working
import fontsSCSSVars from "./export.module.scss";

export const fonts = scssVarsToMap(fontsSCSSVars);
