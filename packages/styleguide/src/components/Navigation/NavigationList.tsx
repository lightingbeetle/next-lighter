import styled from "styled-components";
import { theme } from "../../styles";

const NavigationList = styled.ul`
  list-style: none;
  padding: ${props => `${props.theme.space.small} ${props.theme.space.medium}`};
  margin: 0;

  li > & {
    padding: ${props => `0 ${props.theme.space.small}`};
  }
`;

NavigationList.defaultProps = {
  theme
};

export default NavigationList;
