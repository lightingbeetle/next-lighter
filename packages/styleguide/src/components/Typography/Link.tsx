import React from "react";
import { cloneElement, isValidElement } from "react";
import styled from "styled-components";
import { theme } from "../../styles/";

// FIXME:
// - do not pass element to href

const StyledLink = styled.a`
  font-family: ${(props) => props.theme.font.family};
  color: ${(props) => props.theme.color.accent};
  line-height: ${(props) => props.theme.lineHeight.default};
  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

StyledLink.defaultProps = {
  theme,
};

export type LinkProps = {
  href: string | React.ReactElement;
} & Omit<JSX.IntrinsicElements["a"], "href">;

const Link = ({ href, ...other }: LinkProps) => {
  if (isValidElement(href)) {
    // @ts-ignore
    return cloneElement(href, {}, <StyledLink {...other} />);
  }

  // @ts-ignore
  return <StyledLink href={href as string} {...other} />;
};

export default Link;
