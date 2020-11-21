import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  font: {
    size: {
      default: "16px"
    },
    family: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    weight: {
      default: 400,
      bold: 700
    }
  },
  lineHeight: {
    default: 1.5
  },
  color: {
    black: "#000",
    white: "#fff",
    accent: "#f85013"
  },
  space: {
    medium: "1.5rem"
  },
  contentWidth: "55ch"
};

export default theme;
