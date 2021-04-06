import "./styles/globals.scss";

import Bar, { BarItem, BarBreak } from "./components/Bar";
import Button from "./components/Button";
import Icon from "./components/Icon";
import Select from "./components/Select";

// TODO: Tokens should have own entry
import {
  color,
  colorHex,
  colors,
  breakpoints,
  spaces,
  fonts,
  shadows,
  TokensTable,
} from "./tokens";

import "./styles/utilities.scss";
import "./styles/layout.scss";

export const tokens = {
  color,
  colorHex,
  colors,
  breakpoints,
  spaces,
  fonts,
  shadows,
  TokensTable,
};

export { Select, Icon, Button, Bar, BarItem, BarBreak };
