import { createContext, useContext } from "react";
import { Props } from "./useProps";

type PropsContextType = {
  props: Props;
  displayName: string;
  description: string;
};

const PropsContext = createContext<PropsContextType | undefined>(undefined);

export function usePropsContext() {
  const context = useContext(PropsContext);
  if (!context) {
    throw new Error(
      `Props compound components cannot be rendered outside the Props component`
    );
  }
  return context;
}

export default PropsContext;
