import React, { createContext, ReactNode, useContext } from "react";

type IconContextProps = { spritePath?: string };

const IconContext = createContext<IconContextProps>({
  spritePath: "/icons-sprite.svg"
});

export function useIconContext() {
  const context = useContext(IconContext);

  return context;
}

export function IconProvider({
  children,
  ...props
}: { children: ReactNode } & IconContextProps) {
  return <IconContext.Provider value={props}>{children}</IconContext.Provider>;
}
