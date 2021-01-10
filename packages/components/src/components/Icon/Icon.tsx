import React from "react";
import cx from "classnames";
import { useIconContext } from "./IconsContext";

import "./styles/style.scss";

type IconProps = {
  /** Alternative text for `<title />` tag. Default is the icon name. */
  alt?: string;
  /** Name of the icon to show. */
  name: "chevron-down" | "chevron-up" | "close" | "heart" | "home";
  /** Possible sizes of the icon. */
  size?: "s" | "l";
  /** SVG sprite path. See Customize path to sprite in docs to more info how to change this for all icons. */
  spritePath?: string;
} & JSX.IntrinsicElements["svg"];

const Icon = ({
  className,
  name,
  size,
  spritePath: spritePathProps,
  alt,
  ...other
}: IconProps) => {
  const { spritePath: spritePathContext } = useIconContext();

  const spritePath = spritePathProps ?? spritePathContext;

  const classes = cx(
    {
      [`icon`]: true,
      [`icon--${size}`]: size,
      [`icon--${name}`]: name
    },
    className
  );

  return (
    <svg
      className={classes}
      role={alt ? "img" : "presentation"}
      {...(!alt && { "aria-hidden": "true" })}
      {...other}
    >
      <title>{alt || name}</title>
      <use xlinkHref={`${spritePath}#${name}`} />
    </svg>
  );
};

export default Icon;
