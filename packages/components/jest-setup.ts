import "@testing-library/jest-dom";
import React from "react";
import { toHaveNoViolations } from "jest-axe";

// to hide Warning: useLayoutEffect does nothing on the server
React.useLayoutEffect = React.useEffect;

// extend expect with jest-axe assertions
expect.extend(toHaveNoViolations);
