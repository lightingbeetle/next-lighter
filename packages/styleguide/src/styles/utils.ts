import { rem as polishedRem } from "polished";

// TODO make base variable
export function rem(value, base = "16px") {
  return polishedRem(value, base);
}
