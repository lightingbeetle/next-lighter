import React from "react";

import FileUploader from "./FileUploader";
import FileUploaderError from "./FileUploaderError";
import FileUploaderArea from "./FileUploaderArea";
import FileUploaderPreview from "./FileUploaderPreview";
import FileUploaderFieldControl from "./FileUploaderFieldControl";

type FileUploaderField = {
  error?: React.ReactNode | boolean;
  help?: React.ReactNode;
  label?: React.ReactNode;
  warning?: React.ReactNode | boolean;
} & FileUploader;

interface FileUploaderFieldContext {
  error?: FileUploaderField["error"];
  help?: FileUploaderField["help"];
  label?: FileUploaderField["label"];
  required?: FileUploader["required"];
  warning?: FileUploaderField["warning"];
}

export const FileUploaderFieldContext =
  React.createContext<FileUploaderFieldContext>({});

export function useFileUploaderFieldContext() {
  const context = React.useContext(FileUploaderFieldContext);

  if (!context) {
    throw new Error(
      `FileUploaderField components cannot be rendered outside the FileUploaderField component`
    );
  }

  return context;
}

export const FileUploaderFieldLabel = () => {
  const { label, required } = useFileUploaderFieldContext();

  // TODO: required label
  return label ? <label>{label}</label> : null;
};

export const FileUploaderFieldMessage = () => {
  const { error, help, warning } = useFileUploaderFieldContext();

  return (
    <>
      {/** TODO styles for specific messages */}
      {help && <div>{help}</div>}
      {warning && <div>{warning}</div>}
      <FileUploaderError error={error} />
    </>
  );
};

export const FileUploaderFieldArea = (texts?: any) => {
  const { error } = useFileUploaderFieldContext();

  return <FileUploaderArea areaTexts={texts} error={error} />;
};

export const FileUploaderFieldPreview = () => <FileUploaderPreview />;

const FileUploaderField = ({
  children,
  dropzoneOptions,
  error,
  help,
  id,
  label,
  onChange,
  required,
  warning,
  ...other
}: FileUploaderField) => {
  return (
    <FileUploader
      dropzoneOptions={dropzoneOptions}
      id={id}
      onChange={onChange}
      {...other}
    >
      <FileUploaderFieldControl error={error} warning={warning} {...other}>
        <FileUploaderFieldContext.Provider
          value={{ error, warning, required, label, help }}
        >
          {children || (
            <>
              <FileUploaderFieldLabel />
              <FileUploaderFieldMessage />
              <FileUploaderPreview />
              <FileUploaderFieldArea />
            </>
          )}
        </FileUploaderFieldContext.Provider>
      </FileUploaderFieldControl>
    </FileUploader>
  );
};

FileUploaderField.displayName = "FileUploaderField";

export default FileUploaderField;
