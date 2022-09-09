import styled from "styled-components";
import { theme } from "../../styles";

const Rectangle = styled.div`
  background: ${({ theme }) => theme.color.grey};
`;

Rectangle.defaultProps = {
  theme,
};

Rectangle.displayName = "Rectangle";

export default Rectangle;
