import React from "react";
import { Accept } from "react-dropzone";

import { useFileUploaderContext } from "./FileUploader";

type FileUploaderError = {
  /** Error message text */
  error?: React.ReactNode;
  /** Option to show error message as Message or Notification */
  type?: "message" | "notification";
  /** Option to rewrite generic maximum file size error message */
  fileSizeErrorMessage?: React.ReactNode;
  /** Option to rewrite generic accepted file formats error message */
  acceptedFormatsErrorMessage?: React.ReactNode;
};

const handleErrorMessages = (
  type: string,
  accept?: Accept,
  maxSize?: number,
  fileSizeErrorMessage?: React.ReactNode,
  acceptedFormatsErrorMessage?: React.ReactNode
) => {
  const FILE_TYPES_NZPZS = accept
    ? accept
    : {
        "image/jpg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
      };
  const MAX_FILE_SIZE = maxSize ? maxSize : 10485760;

  switch (type) {
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
      return type;
  }
};

const FileUploaderError = ({
  error: errorProp,
  type = "notification",
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

  // TODO notification and message should look different
  if (type === "notification") {
    return (
      <>
        {errors.map((error, index) => {
          return (
            <div key={index}>
              {handleErrorMessages(
                error,
                accept,
                maxSize,
                fileSizeErrorMessage,
                acceptedFormatsErrorMessage
              )}
            </div>
          );
        })}
      </>
    );
  }

  if (type === "message") {
    return (
      <>
        {errors.map((error, index) => (
          <div key={index}>
            {handleErrorMessages(
              error,
              accept,
              maxSize,
              fileSizeErrorMessage,
              acceptedFormatsErrorMessage
            )}
          </div>
        ))}
      </>
    );
  }

  return null;
};

FileUploaderError.displayName = "FileUploaderError";

export default FileUploaderError;
