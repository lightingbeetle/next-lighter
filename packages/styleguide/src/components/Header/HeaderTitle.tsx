import styled from "styled-components";
import { H4 } from "../";
import { rem } from "../../styles/utils";

type HeaderTitleProps = JSX.IntrinsicElements["div"];

const StyledTitle = styled(H4)`
  margin: auto 0;
  padding: 0 ${rem(20)};
`;

const HeaderTitle = ({ children, ...other }: HeaderTitleProps) => {
  return <StyledTitle forwardedAs="div">{children}</StyledTitle>;
};

export default HeaderTitle;
