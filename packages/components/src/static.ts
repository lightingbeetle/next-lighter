import Select from "./components/Select/Select.static";
import domReady from "./utils/domReady";
import moduleFactory from "./utils/moduleFactory";

domReady(() => {
  moduleFactory(Select, "[data-select]");
});

// this is here because of Typescript modules detection
export {};
