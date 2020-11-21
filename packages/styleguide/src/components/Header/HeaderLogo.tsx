import styled from "styled-components";
import { rem } from "../../styles/utils";

type HeaderLogoProps = JSX.IntrinsicElements["img"] &
  Pick<JSX.IntrinsicElements["a"], "href">;

const StyledImg = styled.img`
  display: block;
  vertical-align: middle;

  width: auto;
  max-width: ${rem(200)};
  height: ${rem(80)};

  padding: ${rem(10)} ${rem(20)};
`;

const HeaderLogo = ({ href, alt, ...other }: HeaderLogoProps) => {
  // @ts-ignore why is StyledImg throwing type error?
  const image = <StyledImg alt={alt} {...other} />;

  return href ? <a href={href}>{image}</a> : image;
};

export default HeaderLogo;
