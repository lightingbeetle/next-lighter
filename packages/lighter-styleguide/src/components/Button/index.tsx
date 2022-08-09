import styled from "styled-components";
import { theme } from "./../../styles";

const Button = styled.button`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.color.grey};

  padding: ${({ theme }) => theme.space.xsmall};
  margin-bottom: ${({ theme }) => theme.space.small};
  text-decoration: none;
  background: ${({ theme }) => theme.color.white};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.default};
  cursor: pointer;
  text-align: center;
`;

Button.defaultProps = {
  theme,
};

Button.displayName = "Button";

export default Button;
