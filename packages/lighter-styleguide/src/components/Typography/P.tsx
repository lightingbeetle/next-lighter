import styled from "styled-components";
import { theme } from "../../styles/";

const P = styled.p`
  font-family: ${(props) => props.theme.font.family};
  color: ${(props) => props.theme.color.black};
  line-height: ${(props) => props.theme.lineHeight.default};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.space.medium};
  max-width: ${(props) => props.theme.contentWidth};
`;

P.defaultProps = {
  theme,
};

export default P;
