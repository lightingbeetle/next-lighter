import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server.browser";
import reactElementToJSXString, { Options } from "react-element-to-jsx-string";
import unescape from "unescape-html";
import pretty from "pretty";

export type UsePreviewCode = {
  code: String | React.ReactNode;
  codeType: "html" | "jsx";
  JSXOptions?: Options;
};

const getJSXAsStringFromCode = ({
  code,
  JSXOptions = {},
}: Pick<UsePreviewCode, "code" | "JSXOptions">) => {
  const { filterProps = [], ...otherOptions } = JSXOptions;

  const reactElementToJSXStringOptions = {
    showDefaultProps: false,
    showFunctions: true,
    functionValue: (fn) => fn.name,
    displayName: (ReactElement) => ReactElement.type.displayName,

    filterProps:
      typeof filterProps === "function"
        ? filterProps
        : ["mdxType", "originalType", ...filterProps],
    ...otherOptions,
  };

  // if it's text, return it
  if (typeof code === "string") {
    return code;
  }

  // There could be error in parsing JSX code from reactElement
  try {
    // if it's array, we need to pass elemenets one by one
    if (Array.isArray(code)) {
      return code
        .map((markupItem) =>
          reactElementToJSXString(markupItem, reactElementToJSXStringOptions)
        )
        .join("\n");
    }
    // valid element can be passed to reactElementToJSXString directly
    if (isValidElement(code)) {
      return reactElementToJSXString(code, reactElementToJSXStringOptions);
    }
  } catch (e) {
    console.log(e);
    return "There was an error in displaying JSX code";
  }

  return "";
};

const usePreviewCode = ({
  code,
  codeType,
  JSXOptions,
}: UsePreviewCode): { codeAsString: string } => {
  let codeAsString;

  switch (codeType) {
    case "html":
      codeAsString =
        typeof code === "string"
          ? unescape(code)
          : pretty(renderToStaticMarkup(code as React.ReactElement));
      break;
    case "jsx":
      codeAsString = getJSXAsStringFromCode({
        code,
        JSXOptions,
      });
      break;
  }

  return { codeAsString };
};

export default usePreviewCode;
