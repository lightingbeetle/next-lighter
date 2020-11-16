import styled from "styled-components";
import { theme } from "../../styles/";

const Link = styled.a`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.color.accent};
  line-height: ${props => props.theme.lineHeight.default};
  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

Link.defaultProps = {
  theme
};

export default Link;
