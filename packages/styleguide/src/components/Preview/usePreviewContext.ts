import { createContext, useContext } from "react";
import { UsePreviewCode } from "./usePreviewCode";

type PreviewContextType = {
  code: React.ReactNode;
  showCode: boolean;
  setShowCode: (showCode: boolean) => void;
  codeType: UsePreviewCode["codeType"];
  setCodeType: (codeType: UsePreviewCode["codeType"]) => void;
  codeAsString: string;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function usePreviewContext() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error(
      `Props compound components cannot be rendered outside the Props component`
    );
  }
  return context;
}

export default PreviewContext;
