import React from "react";
import { usePreviewContext } from "./usePreviewContext";

const PreviewUI = () => {
  const { code } = usePreviewContext();

  return <div>{code}</div>;
};

export default PreviewUI;
