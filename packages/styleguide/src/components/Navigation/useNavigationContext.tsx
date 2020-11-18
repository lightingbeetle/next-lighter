import { createContext, useContext } from "react";

type NavigationContextType = {
  children: React.ReactNode;
  activePage: string;
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
