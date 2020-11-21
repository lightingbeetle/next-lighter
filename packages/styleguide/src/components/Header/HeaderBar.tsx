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
`;

StyledHeader.defaultProps = {
  theme
};

const StyledLogoArea = styled.div`
  width: ${rem(200)};
  display: flex;
`;

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
