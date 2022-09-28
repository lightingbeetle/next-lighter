import React from "react";
import cx from "classnames";
import { useFileUploaderContext } from "./FileUploader";

type FileUploaderFieldControl = {
  error?: React.ReactNode | boolean;
  warning?: React.ReactNode | boolean;
} & JSX.IntrinsicElements["div"];

const FileUploaderFieldControl = ({
  children,
  error: errorProp,
  warning,
  ...other
}: FileUploaderFieldControl) => {
  const { files } = useFileUploaderContext();

  const error = errorProp || files?.some((file) => file.error);

  const formControlClasses = cx("form-control", "form-control--file", {
    [`is-error`]: error,
    [`is-warning`]: warning,
  });

  return (
    <div className={formControlClasses} {...other}>
      {children}
    </div>
  );
};

FileUploaderFieldControl.displayName = "FileUploaderFieldControl";

export default FileUploaderFieldControl;
