import { createContext, useContext } from "react";
import { NavigationContextType } from "./../Navigation/useNavigationContext";

export type StyleguideContextType = {
  children: React.ReactNode;
  routes: NavigationContextType["routes"];
  adminHref: string;
  currentPage: string;
  logoHref: string;
  logoSrc: string;
  logoAlt: string;
};

const StyleguideContext = createContext<StyleguideContextType | undefined>(
  undefined
);

export function useStyleguideContext() {
  const context = useContext(StyleguideContext);
  if (!context) {
    throw new Error(
      `Styleguide compound components cannot be rendered outside the Styleguide component`
    );
  }
  return context;
}

export default StyleguideContext;
