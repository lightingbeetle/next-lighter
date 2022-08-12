import React from "react";

import { useFileUploaderContext } from "./FileUploader";
import FileUploaderPreviewItem from "./FileUploaderPreviewItem";
import { File } from "./useFileUploader";

interface FileUploaderPreview {
  /** Option to show delete button */
  allowDelete?: boolean;
  /** On delete callback */
  onDelete?: (index: number) => void;
  /** On download callback */
  onDownload?: (index: number, file: File) => void;
}

const FileUploaderPreview = ({
  allowDelete = true,
  onDelete,
  onDownload,
}: FileUploaderPreview) => {
  const { files, handleDelete } = useFileUploaderContext();

  return (
    <>
      {files &&
        files.length > 0 &&
        files.map((file, index) => (
          <FileUploaderPreviewItem
            key={index}
            file={file}
            {...(allowDelete
              ? {
                  onDelete: () => {
                    if (handleDelete) {
                      if (onDelete) {
                        onDelete(index);
                      }
                      handleDelete(index);
                    }
                  },
                }
              : {})}
            {...(onDownload
              ? { onDownload: () => onDownload(index, file) }
              : {})}
          />
        ))}
    </>
  );
};

FileUploaderPreview.displayName = "FileUploaderPreview";

export default FileUploaderPreview;
