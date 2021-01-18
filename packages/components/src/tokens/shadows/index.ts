import scssVarsToMap from "../../utils/scssVarsToMap";
// @ts-ignore Microbundle fails on this, but otherwise it seems working
import shadowsSCSSVars from "./export.module.scss";

export const shadows = scssVarsToMap(shadowsSCSSVars);
