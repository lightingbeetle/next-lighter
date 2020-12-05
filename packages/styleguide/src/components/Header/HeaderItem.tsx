import styled from "styled-components";
import { rem } from "../../styles/utils";
import { theme } from "../../styles";

type HeaderTitleProps = JSX.IntrinsicElements["div"];

const StyledItem = styled.div`
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

StyledItem.defaultProps = {
  theme
};

const HeaderItem = ({ children, ...other }: HeaderTitleProps) => {
  return <StyledItem>{children}</StyledItem>;
};

export default HeaderItem;
