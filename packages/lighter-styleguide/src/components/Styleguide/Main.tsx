import React from "react";
import styled from "styled-components";
import { useStyleguideContext } from "./useStyleguideContext";
import { theme } from "../../styles";

const StyledMain = styled.main`
  flex: 1 1 auto;
  padding: ${({ theme }) => `${theme.space.large} ${theme.space.large}`}};
  overflow-x: hidden;
`;

StyledMain.defaultProps = {
  theme,
};

const Main = () => {
  const { children } = useStyleguideContext();
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
