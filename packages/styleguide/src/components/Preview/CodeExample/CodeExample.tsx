import { useState } from "react";
import Code from "../../Code";

import useCodeExample, { UseCodeExample } from "./useCodeExample";

type CodeExampleProps = {
  children: React.Component;
  JSXOptions?: UseCodeExample["JSXOptions"];
};

const CodeExample = ({ children, JSXOptions }: CodeExampleProps) => {
  const [type, setType] = useState<UseCodeExample["type"]>("jsx");
  const code = useCodeExample({ code: children, type, JSXOptions });

  return (
    <>
      <button onClick={() => setType("jsx")}>JSX</button>
      <button onClick={() => setType("html")}>HTML</button>
      <Code inline={false} language={type === "html" ? "markup" : type}>
        {code}
      </Code>
    </>
  );
};

export default CodeExample;
