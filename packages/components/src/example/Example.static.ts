import hookIt from "@lighting-beetle/lighter-hooks";
import { useEffect } from "react";

import useExample from "./useExample";

const exampleInit = hookIt((el: HTMLElement) => {
  const { color, onClick } = useExample();

  useEffect(() => {
    el.addEventListener("click", onClick);
    return () => {
      el.addEventListener("click", onClick);
    };
  }, [el, onClick]);

  useEffect(() => {
    const classes = [
      ...Array.from(el.classList).filter(
        (cl) => !cl.startsWith("example--color-")
      ),
      `example--color-${color}`,
    ];

    el.className = classes.join(" ");
  }, [el, color]);
});

export default exampleInit;
