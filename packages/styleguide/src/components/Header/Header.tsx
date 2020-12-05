import { useMemo } from "react";
import HeaderBar from "./HeaderBar";
import HeaderContext, { HeaderContextType } from "./useHeaderContext";

type HeaderProps = {
  children?: React.ReactNode;
} & HeaderContextType;

const Header = ({ children, logoArea, mainArea, actionArea }: HeaderProps) => {
  const value = useMemo(
    () => ({
      logoArea,
      mainArea,
      actionArea
    }),
    [logoArea, mainArea, actionArea]
  );

  return (
    <HeaderContext.Provider value={value}>
      {children || <HeaderBar />}
    </HeaderContext.Provider>
  );
};

export default Header;
