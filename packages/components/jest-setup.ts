import "@testing-library/jest-dom";
import React from "react";

// to hide Warning: useLayoutEffect does nothing on the server
React.useLayoutEffect = React.useEffect;
