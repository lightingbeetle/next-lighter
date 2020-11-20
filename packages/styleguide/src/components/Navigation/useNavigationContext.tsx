import { createContext, useContext } from "react";
import { NavigationItemProps } from "./NavigationItem";

export type NavigationContextType = {
  activePage?: string;
  routes: NavigationItemProps[];
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      `Navigation compound components cannot be rendered outside the Navigation component`
    );
  }
  return context;
}

export default NavigationContext;
