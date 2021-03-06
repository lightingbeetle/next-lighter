import React from "react";
import styled from "styled-components";
import { theme } from "../../styles";
import { rem } from "../../styles/utils";

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
  theme,
};

const HeaderBar = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default HeaderBar;
