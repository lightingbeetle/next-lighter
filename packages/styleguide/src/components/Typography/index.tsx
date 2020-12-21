import * as React from "react";

import H from "./H";

export const H1 = props => <H level={1} {...props} />;
export const H2 = props => <H level={2} {...props} />;
export const H3 = props => <H level={3} {...props} />;
export const H4 = props => <H level={4} {...props} />;
export const H5 = props => <H level={5} {...props} />;
export const H6 = props => <H level={6} {...props} />;

export { default as P } from "./P";
export { default as Link } from "./Link";
