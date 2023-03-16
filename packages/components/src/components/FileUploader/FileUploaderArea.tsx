import React from "react";
import Button from "../Button";
import cx from "classnames";

import { useFileUploaderContext } from "./FileUploader";
import Icon from "../Icon";

export interface AreaTextProps {
  label?: string;
  text?: string;
}

type FileUploaderAreaProps = {
  areaTexts?: AreaTextProps;
  error?: React.ReactNode;
} & React.ComponentProps<"div">;

const FileUploaderArea = ({
  areaTexts,
  className,
  error: errorProp,
  ...other
}: FileUploaderAreaProps) => {
  const { files, getRootProps, input } = useFileUploaderContext();

  // check if some file have error
  const classes = cx(
    "file-uploader__area",
    {
      [`file-uploader--error`]: errorProp || files?.some((file) => file.error),
    },
    className
  );

  return (
    <div {...getRootProps?.()} className={classes} {...other}>
      <span className="file-uploader__area-title">
        {areaTexts?.text ?? "Presuňte súbor sem alebo kliknite na"}
      </span>
      <Button type="link" className="no-mrg-bottom">
        <Icon name="heart" /> {areaTexts?.label ?? "Priložiť súbor"}
      </Button>
      {input}
    </div>
  );
};

FileUploaderArea.displayName = "FileUploaderArea";

export default FileUploaderArea;
