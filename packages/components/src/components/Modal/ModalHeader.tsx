import React from "react";
import cx from "classnames";

import Button from "../Button";
import Icon from "../Icon";

type ModalHeader = {
  children: React.ReactNode;
  id: string;
};

const ModalHeader = ({ children, id }: ModalHeader) => (
  <div className="modal__header">
    <h2 id={id} tabIndex={-1} className={cx("h3", "modal__title")}>
      {children}
    </h2>
    <Button
      data-a11y-dialog-hide
      size="s"
      tabIndex={-1}
      className="modal__close-button"
      aria-label="Zatvoriť modal"
    >
      <Icon name="close" size="s" />
    </Button>
  </div>
);

ModalHeader.displayName = "ModalHeader";

export default ModalHeader;
