import { createElement } from "react";
import { render } from "react-dom";

import limit from "./limit";
var doc = typeof document !== "undefined" ? document : null;

export default function hookIt(fn) {
  // limit infinite recursion
  fn = limit(fn);

  // minimal dom-node compatible stub required by react-like libs
  var holder = !doc
    ? {
        nodeType: 1,
        firstChild: null,
        tagName: "div",
        lastChild: null,
        childNodes: [],
        ownerSVGElement: null,
        namespaceURI: "http://www.w3.org/1999/xhtml",
        appendChild: function appendChild() {},
        replaceChild: function replaceChild() {},
      }
    : doc.createDocumentFragment();

  var currentResult,
    currentCtx,
    currentArgs = [],
    root,
    end;

  function Component() {
    currentResult = fn.apply(currentCtx, currentArgs);
    return null;
  }

  function hookedFn() {
    if (end) throw Error("Function is unhooked");
    currentCtx = this;
    currentArgs = [].concat.apply([], arguments);
    var prevResult = currentResult;

    fn.count = 0;
    root = render(createElement(Component), holder);
    var result = currentResult;
    currentResult = prevResult;

    return result;
  }

  hookedFn.unhookIt = () => {
    render(null, holder, root);
    end = true;
    currentArgs = currentCtx = currentResult = root = null;
  };

  return hookedFn;
}
