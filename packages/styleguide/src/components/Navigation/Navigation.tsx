import { useMemo } from "react";
import NavigationTree from "./NavigationTree";
import NavigationContext from "./useNavigationContext";

type NavigationProps = {
  children: React.ReactNode;
  activePage: string;
  customUI: boolean;
};

const Navigation = ({ children, activePage, customUI }: NavigationProps) => {
  const value = useMemo(
    () => ({
      children,
      activePage
    }),
    [children, activePage]
  );

  return (
    <NavigationContext.Provider value={value}>
      {customUI ? customUI : <NavigationTree />}
    </NavigationContext.Provider>
  );
};

export default Navigation;
