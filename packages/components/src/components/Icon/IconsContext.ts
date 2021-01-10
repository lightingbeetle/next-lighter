import { createContext, useContext } from "react";

const IconsContext = createContext<{ spritePath: string }>({
  spritePath: "/icons-sprite.svg"
});

export function useIconContext() {
  const context = useContext(IconsContext);

  return context;
}

export default IconsContext.Provider;
