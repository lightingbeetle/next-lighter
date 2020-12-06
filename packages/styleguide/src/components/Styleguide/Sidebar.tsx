import styled from "styled-components";
import { rem } from "../../styles/utils";
import { theme } from "../../styles";
import Navigation from "../Navigation";
import { useStyleguideContext } from "./useStyleguideContext";

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
  max-height: calc(100vh - ${rem(80)});

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

const Sidebar = () => {
  const { routes } = useStyleguideContext();
  return (
    <StyledSidebar>
      <StyledSidebarContent>
        <Navigation routes={routes} />
      </StyledSidebarContent>
    </StyledSidebar>
  );
};

export default Sidebar;
