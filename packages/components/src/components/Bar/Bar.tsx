import React from "react";
import cx from "classnames";
import "./styles/style.scss";
import { Responsive } from "../../utils/responsive";
import { genResponsiveClasses } from "../../utils/classes";

type DirectionDescriptor = "horizontal" | "vertical";
type SpaceDescriptor = "small";

type BarProps = JSX.IntrinsicElements["div"] & {
  /** Flex vertical alignment */
  align?: "top" | "bottom";
  /** Allow horizontally stacked items to wrap into new lines */
  canWrap?: boolean;
  /** Default direction of bar (hidden prop) */
  defaultDirection?: DirectionDescriptor;
  /**
  Bar layout direction. Direction can take enum value or media object.
  ```js
  {
    xl: [direction],
    l: [direction],
    m: [direction],
    s: [direction],
    xs: [direction]
  }
  ```
  */
  direction?: DirectionDescriptor | Responsive<DirectionDescriptor>;
  /**
  Space between items (vertical and horizontal - depends on direction). Space can take enum value or media object.
  ```js
  {
    xl: [space],
    l: [space],
    m: [space],
    s: [space],
    xs: [space]
  }
  ```
  */
  space?: SpaceDescriptor | Responsive<SpaceDescriptor>;
};

export const CLASS_ROOT = "bar";

const Bar = ({
  className,
  align,
  canWrap = true,
  defaultDirection = "horizontal",
  direction,
  space,
  ...other
}: BarProps) => {
  // assign default direction if needed
  let BarDirection = direction || defaultDirection;

  // cast BarDirection to object with default(xs) property
  // so it can be merged afterwards with space object
  if (typeof BarDirection === "string") {
    BarDirection = { xs: BarDirection };
  }

  // merge defaultDirection with passed direction
  BarDirection = { ...{ xs: defaultDirection }, ...BarDirection };

  // cast space to object if needed
  const BarSpace =
    typeof space === "string"
      ? Object.keys(BarDirection).reduce((acc, breakpoint) => {
          acc[breakpoint] = space;
          return acc;
        }, {})
      : space || {};

  // merge space with direction or
  // defaultDirection if direction is not specified for that space
  const BarSpaceWithDirection = Object.keys(BarSpace).reduce(
    (acc, breakpoint) => {
      const breakpointDirection = BarDirection[breakpoint] || defaultDirection;

      acc[breakpoint] = `${breakpointDirection}-${BarSpace[breakpoint]}`;
      return acc;
    },
    {}
  );

  // finally merge direction and space togather
  const BarDirectionAndSpace = { ...BarDirection, ...BarSpaceWithDirection };

  const classes = cx(
    CLASS_ROOT,
    {
      [`align-items-${align}`]: align,
      [`${CLASS_ROOT}--nowrap`]: !canWrap,
    },
    ...genResponsiveClasses(CLASS_ROOT, BarDirectionAndSpace),
    className
  );

  return <div className={classes} {...other} />;
};

export default Bar;
