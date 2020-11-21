// import original module declarations
import "styled-components";

type Colors = "black" | "white" | "accent";

declare module "styled-components" {
  export interface DefaultTheme {
    font: {
      size: {
        default: string;
      };
      family: string;
      weight: {
        default: number;
        bold: number;
      };
    };
    lineHeight: {
      default: number;
    };
    color: {
      [key in keyof typeof Colors]: string;
    };
    space: {
      medium: string;
    };
    contentWidth: string;
  }
}
