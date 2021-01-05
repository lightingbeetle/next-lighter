import { rem as polishedRem } from "polished";

export function rem(value: number | string, base: number | string = "16px") {
  return polishedRem(value, base);
}
