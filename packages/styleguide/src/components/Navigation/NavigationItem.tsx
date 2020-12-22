import React from "react";
import styled from "styled-components";
import { Link } from "../Typography";
import { LinkProps } from "../Typography/Link";
import NavigationList from "./NavigationList";
import { useNavigationContext } from "./useNavigationContext";
import { theme } from "../../styles";

export type NavigationItemProps = {
  title: React.ReactNode;
  href?: LinkProps["href"];
  routes?: NavigationItemProps[];
};

const StyledNavigationItem = styled.div`
  display: block;
  position: relative;
  padding: ${props => `${props.theme.space.xsmall} ${props.theme.space.small}`};

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: ${props => props.theme.space.xsmall};

    width: 1px;
    height: calc(100% - 2 * ${props => props.theme.space.xsmall});

    background-color: ${({ theme }) => theme.color.grey};
  }
`;

StyledNavigationItem.defaultProps = {
  theme
};

const NavigationItem = ({ title, href, routes }: NavigationItemProps) => {
  const { activePage } = useNavigationContext();
  return (
    <li>
      {href ? (
        <StyledNavigationItem as={Link} href={href}>
          {title} {href === activePage && "(current)"}
        </StyledNavigationItem>
      ) : (
        <StyledNavigationItem as="span">{title}</StyledNavigationItem>
      )}
      {routes && (
        <NavigationList>
          {routes.map((route, index) => (
            <NavigationItem key={index} {...route} />
          ))}
        </NavigationList>
      )}
    </li>
  );
};

export default NavigationItem;
