import { createElement } from "react";
import { render } from "react-dom";

import limit from "./limit.js";
let doc = typeof document !== "undefined" ? document : null;

export default function hookIt(fn) {
  // limit infinite recursion
  fn = limit(fn);

  // minimal dom-node compatible stub required by react-like libs
  let holder = !doc
    ? {
        nodeType: 1,
        firstChild: null,
        tagName: "div",
        lastChild: null,
        childNodes: [],
        ownerSVGElement: null,
        namespaceURI: "http://www.w3.org/1999/xhtml",
        appendChild() {},
        replaceChild() {}
      }
    : doc.createDocumentFragment();

  let currentResult,
    currentCtx,
    currentArgs = [],
    root,
    end;

  function Component() {
    currentResult = fn.apply(currentCtx, currentArgs);
    return null;
  }

  function hookedFn(...args) {
    if (end) throw Error("Function is unhooked");
    currentCtx = this;
    currentArgs = args;
    let prevResult = currentResult;

    fn.count = 0;
    root = render(createElement(Component), holder);
    let result = currentResult;
    currentResult = prevResult;

    return result;
  }

  hookedFn.unhookIt = () => {
    Promise.resolve().then(() => {
      render("", holder, root);
      end = true;
      currentArgs = currentCtx = currentResult = root = null;
    }, 10);
  };

  return hookedFn;
}
