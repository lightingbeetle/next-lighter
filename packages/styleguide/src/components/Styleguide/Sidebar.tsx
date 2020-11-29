import styled from "styled-components";
import { rem } from "../../styles/utils";
import { theme } from "../../styles";

const StyledSidebar = styled.div`
  width: ${rem(200)};
  height: auto;
  flex: 0 0 auto;
`;

const StyledSidebarContent = styled.div`
  position: sticky;
  top: ${rem(80)};
  overflow-y: auto;
  overflow-x: hidden;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: ${({ theme }) => theme.space.medium};

    height: calc(100% - 2 * ${({ theme }) => theme.space.medium});
    width: 1px;

    background-color: ${({ theme }) => theme.color.grey};
  }
`;

StyledSidebarContent.defaultProps = {
  theme
};

const Sidebar = ({ children }) => {
  return (
    <StyledSidebar>
      <StyledSidebarContent>{children}</StyledSidebarContent>
    </StyledSidebar>
  );
};

export default Sidebar;
