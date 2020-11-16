import { useState } from "react";
import CodeExample from "./CodeExample";

const Preview = ({ children }) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <>
      <div>{children}</div>
      <button onClick={() => setShowCode(!showCode)}>
        {showCode ? "Hide code" : "Show code"}
      </button>
      {showCode && <CodeExample>{children}</CodeExample>}
    </>
  );
};

export default Preview;
