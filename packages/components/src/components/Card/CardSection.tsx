import React, { forwardRef } from "react";
import cx from "classnames";

type CardSection = {
  /** Background color */
  bg?: "white" | "secondary" | "primary";
  /** Url becomes value of section's background-image CSS property */
  bgUrl?: string;
  /** CSS classes */
  className?: string;
  /** Background image is removed for sizes bigger than 768px */
  hasBgOnMobile?: boolean;
  /** Condensed card */
  isCondensed?: boolean;
  /** Content will fill available vertical space */
  isFilling?: boolean;
  /** Type of section */
  type?: "content" | "image" | "video";
  /** Props to sets <source /> element's attributes */
} & JSX.IntrinsicElements["div"];

const CardSection = forwardRef<HTMLDivElement, CardSection>(
  (
    {
      children,
      className,
      style,
      bg,
      isFilling,
      isCondensed,
      hasBgOnMobile,
      bgUrl,
      type = "content",
      ...other
    },
    outerRef
  ) => {
    const classes = cx({
      [`card__section`]: true,
      [`card__section--fill`]: isFilling,
      [`card__section--condensed`]: isCondensed,
      [`card__section--show-bg-responsive`]: hasBgOnMobile,
      [`card__section--${bg}`]: bg,
      [`card__section--bg-image`]: bgUrl,
      [`card__section--${type}`]: type && type !== "content",
      [`${className}`]: className,
    });

    return (
      <div
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
