import styled from "styled-components";
import { theme } from "../../styles";
import { rem } from "../../styles/utils";
import HeaderItem from "./HeaderItem";
import { useHeaderContext } from "./useHeaderContext";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  height: ${rem(80)};
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 1;

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
  flex: 0 0 ${rem(200)};
`;

StyledLogoArea.defaultProps = {
  theme
};

const StyledMainArea = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

const StyledActionArea = styled.div`
  display: flex;
  align-items: middle;
  flex: 0 0 auto;
`;

StyledActionArea.defaultProps = {
  theme
};

const HeaderBar = () => {
  const { logoArea, mainArea, actionArea } = useHeaderContext();
  return (
    <StyledHeader>
      {logoArea && <StyledLogoArea>{logoArea}</StyledLogoArea>}
      {mainArea && (
        <StyledMainArea>
          <HeaderItem>{mainArea}</HeaderItem>
        </StyledMainArea>
      )}
      {actionArea && (
        <StyledActionArea>
          <HeaderItem>{actionArea}</HeaderItem>
        </StyledActionArea>
      )}
    </StyledHeader>
  );
};

export default HeaderBar;
