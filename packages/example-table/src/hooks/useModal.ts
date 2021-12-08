import { useState } from "react";

/**
 * Using modal state for visiblity
 */

const useModal = () => {
  const [isVisible, setVisible] = useState<boolean>();
  const handleShow = () => {
    setVisible(true);
  };
  const handleHide = () => {
    setVisible(false);
  };

  return { isVisible, setVisible, handleShow, handleHide };
};

export default useModal;
