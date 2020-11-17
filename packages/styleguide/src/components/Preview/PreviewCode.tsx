import Code from "../Code";
import { usePreviewContext } from "./usePreviewContext";

const PreviewCode = () => {
  const { showCode, codeType, setCodeType, codeAsString } = usePreviewContext();

  if (!showCode) {
    return null;
  }

  return (
    <>
      <button onClick={() => setCodeType("jsx")}>JSX</button>
      <button onClick={() => setCodeType("html")}>HTML</button>
      <Code inline={false} language={codeType === "html" ? "markup" : codeType}>
        {codeAsString}
      </Code>
    </>
  );
};

export default PreviewCode;
