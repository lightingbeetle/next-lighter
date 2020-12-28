import exampleInit from "./components/example/Example.static";
import domReady from "./utils/domReady";
import moduleFactory from "./utils/moduleFactory";

domReady(() => {
  moduleFactory(exampleInit, "[data-example]");
});

// this is here because of Typescript modules detection
export {};
