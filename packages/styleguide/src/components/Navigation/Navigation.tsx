import React, { useMemo } from "react";
import NavigationTree from "./NavigationTree";
import NavigationContext, {
  NavigationContextType
} from "./useNavigationContext";

type NavigationProps = {
  customUI?: boolean;
} & NavigationContextType;

const Navigation = ({ activePage, customUI, routes }: NavigationProps) => {
  const value = useMemo(
    () => ({
      activePage,
      routes
    }),
    [activePage, routes]
  );

  return (
    <NavigationContext.Provider value={value}>
      {customUI ? customUI : <NavigationTree />}
    </NavigationContext.Provider>
  );
};

export default Navigation;
