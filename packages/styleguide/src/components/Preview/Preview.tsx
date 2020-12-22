import React, { useMemo, useState } from "react";
import PreviewCode from "./PreviewCode";
import usePreviewCode, { UsePreviewCode } from "./usePreviewCode";
import PreviewCodeToggle from "./PreviewCodeToggle";
import PreviewUI from "./PreviewUI";
import PreviewContext from "./usePreviewContext";
import PreviewContainer from "./PreviewContainer";

type PreviewProps = {
  children: React.ReactNode;
  customUI?: React.ReactNode;
  JSXOptions?: UsePreviewCode["JSXOptions"];
};

const Preview = ({ children, customUI, JSXOptions }: PreviewProps) => {
  const [showCode, setShowCode] = useState(false);
  const [codeType, setCodeType] = useState<UsePreviewCode["codeType"]>("jsx");
  const { codeAsString } = usePreviewCode({
    code: children,
    codeType,
    JSXOptions
  });

  const value = useMemo(
    () => ({
      code: children,
      showCode,
      setShowCode,
      codeType,
      setCodeType,
      codeAsString
    }),
    [showCode, children, codeType, codeAsString]
  );

  return (
    <PreviewContext.Provider value={value}>
      {customUI ? (
        customUI
      ) : (
        <PreviewContainer>
          <PreviewUI />
          <PreviewCodeToggle />
          <PreviewCode />
        </PreviewContainer>
      )}
    </PreviewContext.Provider>
  );
};

export default Preview;
