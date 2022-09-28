import React from "react";
import Button from "../Button";

import { useFileUploaderContext } from "./FileUploader";

const FileUploaderButton = ({ children = "Nahrať", ...props }) => {
  const { getRootProps, input } = useFileUploaderContext();
  return (
    <span {...getRootProps?.()}>
      {input}
      <Button {...props}>{children}</Button>
    </span>
  );
};

FileUploaderButton.displayName = "FileUploaderButton";

export default FileUploaderButton;
