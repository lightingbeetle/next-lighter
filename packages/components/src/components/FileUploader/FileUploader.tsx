import React from "react";

import cx from "classnames";
import { Accept, DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

import useFileUploader, { UseFileUploader, File } from "./useFileUploader";

import FileUploaderPreview from "./FileUploaderPreview";
import FileUploaderArea from "./FileUploaderArea";
import FileUploaderError from "./FileUploaderError";

type FileUploader = Omit<JSX.IntrinsicElements["input"], "accept"> & {
  children?: React.ReactNode;
  /** Config for React dropzone */
  dropzoneOptions?: UseFileUploader["dropzoneOptions"];
  /** ID for FileUploader */
  id: string;
  /** Option to add initial files */
  initialFiles?: File[];
  /** Option to set maximum files which can be uploaded */
  maxFiles?: number;
  /** onChange callback */
  onChange?: UseFileUploader["onChange"];
  accept?: Accept;
};

interface FileUploaderContext {
  files?: File[];
  getInputProps?: () => DropzoneInputProps;
  getRootProps?: () => DropzoneRootProps;
  handleDelete?: (index: any) => void;
  initUpload?: (files: File[]) => void;
  input?: React.ReactElement;
  accept?: Accept;
  maxSize?: number;
}

export const FileUploaderContext = React.createContext<FileUploaderContext>({});

export function useFileUploaderContext() {
  const context = React.useContext(FileUploaderContext);
  return context;
}

const FileUploader = ({
  children,
  dropzoneOptions,
  maxFiles,
  className,
  accept,
  ...other
}: FileUploader) => {
  const {
    files,
    getInputProps,
    getRootProps,
    handleDelete,
    initUpload,
    input,
  } = useFileUploader({
    dropzoneOptions,
    accept,
    ...other,
  });

  //@ts-ignore
  const { maxSize } = dropzoneOptions || {};

  const classes = cx("file-uploader", className);

  return (
    <FileUploaderContext.Provider
      value={{
        getInputProps,
        getRootProps,
        initUpload,
        input,
        files,
        handleDelete,
        accept,
        maxSize,
      }}
    >
      <div className={classes}>
        {children || (
          <>
            <FileUploaderPreview />
            {maxFiles ? (
              files.length < maxFiles && <FileUploaderArea />
            ) : (
              <FileUploaderArea />
            )}
            <FileUploaderError />
          </>
        )}
      </div>
    </FileUploaderContext.Provider>
  );
};

FileUploader.displayName = "FileUploader";

export default FileUploader;
