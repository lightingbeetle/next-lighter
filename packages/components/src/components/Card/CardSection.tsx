import React, { forwardRef } from "react";
import cx from "classnames";

type CardSectionProps = {
  /** Background color */
  bg?: "white" | "secondary" | "primary";
  /** Url becomes value of section's background-image CSS property */
  bgUrl?: string;
  /** Content will fill available vertical space */
  isFilling?: boolean;
} & React.ComponentProps<"div">;

const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, style, bg, isFilling, bgUrl, ...other }, ref) => {
    const classes = cx(
      "card__section",
      {
        [`card__section--fill`]: isFilling,
        [`card__section--${bg}`]: bg,
        [`card__section--bg-image`]: bgUrl,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          ...style,
          ...(bgUrl && { backgroundImage: `url(${bgUrl})` }),
        }}
        {...other}
      >
        {children}
      </div>
    );
  }
);

CardSection.displayName = "CardSection";

export default CardSection;
