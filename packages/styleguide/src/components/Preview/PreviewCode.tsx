import React from "react";
import Button from "../Button";
import Code from "../Code";
import { usePreviewContext } from "./usePreviewContext";

const PreviewCode = () => {
  const { showCode, codeType, setCodeType, codeAsString } = usePreviewContext();

  if (!showCode) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setCodeType("jsx")}>JSX</Button>
      <Button onClick={() => setCodeType("html")}>HTML</Button>
      <Code inline={false} language={codeType === "html" ? "markup" : codeType}>
        {codeAsString}
      </Code>
    </>
  );
};

export default PreviewCode;
