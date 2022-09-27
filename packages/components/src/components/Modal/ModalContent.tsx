import React from "react";
import cx from "classnames";

type ModalContent = {
  children: React.ReactNode;
  className?: string;
};

const ModalContent = ({ children, className }: ModalContent) => (
  <div className={cx("modal__content", className)}>{children}</div>
);

ModalContent.displayName = "ModalContent";

export default ModalContent;
