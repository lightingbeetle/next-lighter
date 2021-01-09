import React from "react";
import styled from "styled-components";
import { rem } from "../../styles/utils";
import { theme } from "../../styles";

type HeaderTitleProps = {
  fill?: boolean;
} & JSX.IntrinsicElements["div"];

const StyledItem = styled.div<Pick<HeaderTitleProps, "fill">>`
  display: flex;
  align-items: middle;
  flex: ${(props) => (props.fill ? 1 : 0)}0 0 auto;
`;

const StyledItemContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: auto 0;
  padding: 0 ${rem(20)};

  position: relative;

  & > *:last-child {
    margin-bottom: 0;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: calc(${({ theme }) => theme.space.medium});

    width: 1px;
    height: calc(100% - 2 * ${({ theme }) => theme.space.medium});

    background-color: ${({ theme }) => theme.color.grey};
  }
`;

StyledItemContent.defaultProps = {
  theme,
};

const HeaderItem = ({ children, fill, ...other }: HeaderTitleProps) => {
  return (
    <StyledItem fill={fill}>
      <StyledItemContent>{children}</StyledItemContent>
    </StyledItem>
  );
};

export default HeaderItem;
