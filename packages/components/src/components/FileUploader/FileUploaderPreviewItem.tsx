import React from "react";

import cx from "classnames";

import { formatBytes } from "./utils/formatBytes";
import { File } from "./useFileUploader";

import Bar, { BarItem } from "../Bar";
import Button from "../Button";
import Icon from "../Icon";

type FileUploaderPreviewItem = {
  file: File;
  onDelete?: () => void;
  onDownload?: () => void;
} & JSX.IntrinsicElements["div"];

const FileUploaderPreviewItem = ({
  className,
  file,
  onDelete,
  onDownload,
  ...other
}: FileUploaderPreviewItem) => {
  const classes = cx("file-uploader__preview-item", {
    [`${className}`]: className,
  });

  if (file.error) {
    return null;
  }

  // split base to base and extension
  const [base, ext] = file?.name?.split(/\.(?=[^.]+$)/) ?? [];

  // convert bytes to MB
  const sizeInMb = formatBytes(file.size);

  return (
    <div className={classes} {...other}>
      <Bar className="no-mrg-bottom" space="small">
        <BarItem isFilling>
          <div>{`${ext} • ${sizeInMb}`}</div>
          <div className="text-normal text-ellipsis">{base}</div>
        </BarItem>
        <BarItem>
          {onDelete && (
            <Button className="no-pad-right" onClick={onDelete} type="link">
              <Icon className="icon--left" name="close" />
              <span className="show-l">Vymazať</span>
            </Button>
          )}
          {onDownload && (
            <Button className="no-pad-right" onClick={onDownload} type="link">
              <Icon className="icon--left" name="chevron-down" />
              <span className="show-l">Stiahnuť</span>
            </Button>
          )}
        </BarItem>
      </Bar>
    </div>
  );
};

export default FileUploaderPreviewItem;
