import React from "react";
import { oneOf } from "prop-types";
import cx from "classnames";

import { genResponsiveClasses, getResponsivePropType } from "../../utils";

const propTypes = {
  /** Flex vertical alignment */
  align: oneOf(["top", "middle", "bottom"]),
  /** Default direction of bar (hidden prop) */
  defaultDirection: oneOf(["horizontal", "vertical"]),
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
  direction: getResponsivePropType(oneOf(["horizontal", "vertical"])),
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
  space: getResponsivePropType(oneOf(["small"])),
};

const defaultProps = {
  defaultDirection: "horizontal",
};

const CLASS_ROOT = "bar";

const Bar = ({
  className,
  align,
  defaultDirection,
  direction,
  space,
  ...other
}) => {
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
    },
    ...genResponsiveClasses(CLASS_ROOT, BarDirectionAndSpace),
    className
  );

  return <div className={classes} {...other} />;
};

Bar.displayName = "Bar";
Bar.propTypes = propTypes;
Bar.defaultProps = defaultProps;

export default Bar;
