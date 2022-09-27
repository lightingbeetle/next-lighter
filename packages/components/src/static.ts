import Modal from "./components/Modal/Modal.static";
import Select from "./components/Select/Select.static";
import domReady from "./utils/domReady";
import moduleFactory from "./utils/moduleFactory";

domReady(() => {
  //@ts-ignore moduleFactory types don't support classes yet
  moduleFactory(Modal, "[data-modal]");
  moduleFactory(Select, "[data-select]");
});

// this is here because of Typescript modules detection
export {};
