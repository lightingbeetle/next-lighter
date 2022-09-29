import React from "react";
import cx from "classnames";
import { useIconContext } from "./IconContext";

type IconProps = {
  /** Alternative text for `<title />` tag. Default is the icon name. `null` can be passed when icon is wrapped by meaningul action like link which should be described by `aria-label`. */
  alt?: string | null;
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
      [`icon--${name}`]: name,
    },
    className
  );

  return (
    <svg
      className={classes}
      role={alt && "img"}
      {...(!alt && { "aria-hidden": "true" })}
      {...other}
    >
      {alt !== null && <title>{alt || name}</title>}
      <use xlinkHref={`${spritePath ?? ""}#${name}`} />
    </svg>
  );
};

Icon.displayName = "Icon";

export default Icon;
