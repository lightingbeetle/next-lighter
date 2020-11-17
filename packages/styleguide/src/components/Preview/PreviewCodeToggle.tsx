import { usePreviewContext } from "./usePreviewContext";

const PreviewCodeToggle = () => {
  const { showCode, setShowCode } = usePreviewContext();

  return (
    <>
      <button onClick={() => setShowCode(!showCode)}>
        {showCode ? "Hide code" : "Show code"}
      </button>
    </>
  );
};

export default PreviewCodeToggle;
