import styled from "styled-components";
import { rem } from "../../styles/utils";
import { useStyleguideContext } from "../Styleguide/useStyleguideContext";

type HeaderLogoProps = JSX.IntrinsicElements["img"] &
  Pick<JSX.IntrinsicElements["a"], "href">;

const StyledLogoArea = styled.div`
  width: ${rem(200)};
  display: flex;
  flex: 0 0 ${rem(200)};
`;

const StyledImg = styled.img`
  display: block;
  vertical-align: middle;

  width: auto;
  max-width: ${rem(200)};
  height: ${rem(80)};

  padding: ${rem(10)} ${rem(20)};
`;

const HeaderLogo = ({ href, alt = "logo", ...other }: HeaderLogoProps) => {
  const { logoHref, logoSrc, logoAlt } = useStyleguideContext();
  // @ts-ignore why is StyledImg throwing type error?
  const image = <StyledImg alt={logoAlt} src={logoSrc} {...other} />;

  return (
    <StyledLogoArea>
      {logoHref ? <a href={logoHref}>{image}</a> : image}
    </StyledLogoArea>
  );
};

export default HeaderLogo;
