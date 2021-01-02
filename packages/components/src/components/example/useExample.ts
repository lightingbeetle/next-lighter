import { useCallback, useState } from "react";

type ExampleColors = "primary" | "error";

const useExample = () => {
  const [color, setColor] = useState<ExampleColors>("primary");

  const onClick = useCallback(() => {
    // toggle colors
    setColor((color) => (color === "primary" ? "error" : "primary"));
  }, []);

  return { color, onClick };
};

export default useExample;
