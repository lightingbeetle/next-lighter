import { useMemo } from "react";
import HeaderBar from "./HeaderBar";
import HeaderContext, { HeaderContextType } from "./useHeaderContext";

type HeaderProps = {
  children?: React.ReactNode;
} & HeaderContextType;

const Header = ({ children, logoArea, titleArea }: HeaderProps) => {
  const value = useMemo(
    () => ({
      logoArea,
      titleArea
    }),
    [logoArea, titleArea]
  );

  return (
    <HeaderContext.Provider value={value}>
      {children || <HeaderBar />}
    </HeaderContext.Provider>
  );
};

export default Header;
