import Button from "../Button";
import { usePreviewContext } from "./usePreviewContext";

const PreviewCodeToggle = () => {
  const { showCode, setShowCode } = usePreviewContext();

  return (
    <Button onClick={() => setShowCode(!showCode)}>
      {showCode ? "Hide code" : "Show code"}
    </Button>
  );
};

export default PreviewCodeToggle;
