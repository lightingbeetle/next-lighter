import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";

import { toBase64 } from "./utils/toBase64";
import generateId from "../../utils/useId";
import { useIsComponentMounted } from "../../utils/hooks";

export interface File {
  error?: string;
  id?: string;
  name?: string;
  preview?: string;
  size?: number;
  type?: string;
}

export type UseFileUploader = Omit<JSX.IntrinsicElements["input"], "accept"> & {
  // HTML5 MIME types - https://react-dropzone.org/#!/Accepting%20specific%20file%20types
  accept?: Accept;
  dropzoneOptions?: DropzoneOptions;
  initialFiles?: File[];
  onChange?: (files: File[]) => void;
};

const useFileUploader = ({
  dropzoneOptions = {},
  onChange = () => {},
  accept = {
    "image/jpg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "application/pdf": [".pdf"],
  },
  multiple,
  // value can't be set on input type=file
  value,
  initialFiles,
  ...other
}: UseFileUploader = {}) => {
  const isMounted = useIsComponentMounted();
  const [files, setFiles] = useState<File[]>(initialFiles || []);
  const setFile = useCallback(
    (file) => {
      if (!isMounted) return;
      if (!multiple) return setFiles([file]);
      if (!file.error && files.findIndex((file) => file.error) !== -1) {
        const cleanFiles = files.filter((file) => !file.error);
        return setFiles([...cleanFiles, file]);
      }
      return setFiles((files) => [...files, file]);
    },
    [files, multiple, isMounted]
  );

  useEffect(() => {
    if (files.length > 0) {
      onChange(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, onChange]);

  const onDropAccepted = useCallback(
    (files) => {
      files.forEach((file: any) => {
        toBase64(
          file,
          (base64) => {
            if (typeof base64 === "string") {
              setFile({
                name: file.name,
                preview: base64 || "",
                size: file.size,
                type: file.type,
                id: generateId("file"),
              });
            }
          },
          () => {}
        );
      });
    },
    [setFile]
  );

  const onDropRejected = useCallback(
    (files) => {
      files.forEach((file: any) => {
        setFile({
          error: file.errors[0].code,
        });
      });
    },
    [setFile]
  );

  const handleDelete = useCallback((index) => {
    setFiles((files) => files.filter((_, fileIndex) => index !== fileIndex));
  }, []);

  const initUpload = useCallback((initFiles) => {
    setFiles(initFiles);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept,
    multiple,
    ...dropzoneOptions,
  });

  const input = useMemo(
    () => (
      <input
        {...getInputProps()}
        aria-label="Nahrať súbor"
        multiple={multiple}
        {...other}
      />
    ),
    [getInputProps, multiple, other]
  );

  return {
    files,
    input,
    getInputProps,
    getRootProps,
    handleDelete,
    initUpload,
  };
};

export default useFileUploader;
