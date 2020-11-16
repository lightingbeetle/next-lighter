import cx from "classnames";
import styled, { css } from "styled-components";
import { theme } from "../../styles/";
import { rem } from "../../styles/utils";

type HProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & JSX.IntrinsicElements["h1"];

export const H = ({ level, className, ...props }: HProps) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return <Tag className={cx(className)} {...props} />;
};

const StyledH = styled(H)<HProps>`
  font-family: ${({ theme }) => theme.font.family};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.color.black};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space.medium};
  max-width: ${({ theme }) => theme.contentWidth};

  ${({ level }) => {
    switch (level) {
      case 1:
        return css`
          font-size: ${rem("48.83px")};
        `;
      case 2:
        return css`
          font-size: ${rem("39.06px")};
        `;
      case 3:
        return css`
          font-size: ${rem("31.25px")};
        `;
      case 4:
        return css`
          font-size: ${rem("25px")};
        `;
      case 5:
        return css`
          font-size: ${rem("20px")};
        `;
      case 6:
        return css`
          font-size: ${rem("16px")};
        `;
    }
  }}
`;

StyledH.defaultProps = {
  theme
};

export default StyledH;
