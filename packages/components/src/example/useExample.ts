import { useCallback, useState } from "react";

type ExampleColors = "blue" | "red";

const useExample = () => {
  const [color, setColor] = useState<ExampleColors>("blue");

  const onClick = useCallback(() => {
    // toggle colors
    setColor((color) => (color === "blue" ? "red" : "blue"));
  }, []);

  return { color, onClick };
};

export default useExample;
