import styled from "styled-components";
import { theme } from "../../styles";

const PreviewContainer = styled.div`
  position: relative;
  padding: ${props => props.theme.space.medium} 0;
  margin-bottom: ${props => props.theme.space.medium};

  &:before {
    content: "";
    position: absolute;
    left: ${props => props.theme.space.medium};
    top: 0;

    width: calc(100% - 2 * ${props => props.theme.space.medium});
    height: 1px;

    background-color: ${({ theme }) => theme.color.grey};
  }

  &:after {
    content: "";
    position: absolute;
    left: ${props => props.theme.space.medium};
    bottom: 0;

    width: calc(100% - 2 * ${props => props.theme.space.medium});
    height: 1px;

    background-color: ${({ theme }) => theme.color.grey};
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

PreviewContainer.defaultProps = {
  theme
};

export default PreviewContainer;
