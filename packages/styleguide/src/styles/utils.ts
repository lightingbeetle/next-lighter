import { rem as polishedRem } from "polished";
import theme from "./theme";

export function rem(value, base = theme.font.size.default) {
  return polishedRem(value, base);
}
