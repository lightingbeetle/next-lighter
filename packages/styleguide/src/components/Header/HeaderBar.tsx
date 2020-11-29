import styled from "styled-components";
import { theme } from "../../styles";
import { rem } from "../../styles/utils";
import { useHeaderContext } from "./useHeaderContext";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  height: ${rem(80)};
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: calc(${({ theme }) => theme.space.medium} + ${rem(200)});

    height: 1px;
    width: calc(100% - ${rem(200)} - 2 * ${({ theme }) => theme.space.medium});

    background-color: ${({ theme }) => theme.color.grey};
  }
`;

StyledHeader.defaultProps = {
  theme
};

const StyledLogoArea = styled.div`
  width: ${rem(200)};
  display: flex;

  position: relative;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: calc(${({ theme }) => theme.space.medium});

    width: 1px;
    height: calc(100% - 2 * ${({ theme }) => theme.space.medium});

    background-color: ${({ theme }) => theme.color.grey};
  }
`;

StyledLogoArea.defaultProps = {
  theme
};

const StyledTitleArea = styled.div`
  width: 100%;
  display: flex;
`;

const HeaderBar = () => {
  const { logoArea, titleArea } = useHeaderContext();
  return (
    <StyledHeader>
      {logoArea && <StyledLogoArea>{logoArea}</StyledLogoArea>}
      {titleArea && <StyledTitleArea>{titleArea}</StyledTitleArea>}
    </StyledHeader>
  );
};

export default HeaderBar;
