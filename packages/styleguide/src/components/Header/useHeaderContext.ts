import { createContext, useContext } from "react";

export type HeaderContextType = {
  logoArea?: React.ReactNode;
  titleArea?: React.ReactNode;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeaderContext() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      `Header compound components cannot be rendered outside the Header component`
    );
  }
  return context;
}

export default HeaderContext;
