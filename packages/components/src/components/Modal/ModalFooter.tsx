import React from "react";
import cx from "classnames";

type ModalFooter = {
  children: React.ReactNode;
  className?: string;
};

const ModalFooter = ({ children, className }: ModalFooter) => (
  <div className={cx("modal__footer", className)}>{children}</div>
);

ModalFooter.displayName = "ModalFooter";

export default ModalFooter;
