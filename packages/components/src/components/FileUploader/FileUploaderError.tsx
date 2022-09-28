import React, { ReactNode } from "react";
import { Accept } from "react-dropzone";

import { useFileUploaderContext } from "./FileUploader";

type ErrorType = "file-invalid-type" | "file-too-large" | string | ReactNode;

type FileUploaderError = {
  /** Error message text */
  error?: ErrorType;
  /** Option to rewrite generic maximum file size error message */
  fileSizeErrorMessage?: React.ReactNode;
  /** Option to rewrite generic accepted file formats error message */
  acceptedFormatsErrorMessage?: React.ReactNode;
};

// TODO: FileUploaderError should just stright forward display errors and leave messages to be handled outside - but could provide helper function similar to handleErrorMessages

const handleErrorMessages = ({
  error,
  accept,
  maxSize,
  fileSizeErrorMessage,
  acceptedFormatsErrorMessage,
}: {
  error: ErrorType;
  accept?: Accept;
  maxSize?: number;
  fileSizeErrorMessage?: React.ReactNode;
  acceptedFormatsErrorMessage?: React.ReactNode;
}) => {
  const FILE_TYPES_NZPZS = accept
    ? accept
    : {
        "image/jpg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
      };
  const MAX_FILE_SIZE = maxSize ? maxSize : 10485760;

  switch (error) {
    case "file-invalid-type":
      return acceptedFormatsErrorMessage
        ? acceptedFormatsErrorMessage
        : `Súbor musí byť vo formáte ${Object.values(FILE_TYPES_NZPZS).flatMap(
            (item) => item
          )}`;
    case "file-too-large":
      return fileSizeErrorMessage
        ? fileSizeErrorMessage
        : `Súbor musí byť menší ako ${MAX_FILE_SIZE / 1000} Kb`;
    default:
      return error;
  }
};

const FileUploaderError = ({
  error: errorProp,
  fileSizeErrorMessage,
  acceptedFormatsErrorMessage,
}: FileUploaderError) => {
  const { files, accept, maxSize } = useFileUploaderContext();

  const error =
    errorProp ||
    files?.filter((file) => file.error).map((error) => error.error);

  if (!error) {
    return null;
  }

  const errors = !Array.isArray(error) ? [error] : error;

  return (
    <>
      {errors.map((error, index) => {
        return (
          <div key={index}>
            {handleErrorMessages({
              error,
              accept,
              maxSize,
              fileSizeErrorMessage,
              acceptedFormatsErrorMessage,
            })}
          </div>
        );
      })}
    </>
  );
};

FileUploaderError.displayName = "FileUploaderError";

export default FileUploaderError;
