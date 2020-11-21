import styled from "styled-components";
import { rem } from "../../styles/utils";

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
`;

const Sidebar = ({ children }) => {
  return (
    <StyledSidebar>
      <StyledSidebarContent>{children}</StyledSidebarContent>
    </StyledSidebar>
  );
};

export default Sidebar;
