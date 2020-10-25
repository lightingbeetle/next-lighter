import { isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import reactElementToJSXString, { Options } from 'react-element-to-jsx-string';
import unescape from 'unescape-html';
import pretty from 'pretty';

export type UseCodeExample = {
  code: String | React.ReactNode;
  type: 'html' | 'jsx';
  JSXOptions?: Options;
};

const getJSXAsStringFromCode = ({
  code,
  JSXOptions = {},
}: Pick<UseCodeExample, 'code' | 'JSXOptions'>) => {
  const { filterProps = [], ...otherOptions } = JSXOptions;

  const reactElementToJSXStringOptions = {
    showDefaultProps: false,
    showFunctions: true,
    functionValue: (fn) => fn.name,
    displayName: (ReactElement) => ReactElement.props.mdxType,
    filterProps:
      typeof filterProps === 'function'
        ? filterProps
        : ['mdxType', 'originalType', ...filterProps],
    ...otherOptions,
  };

  // valid element can be passed to reactElementToJSXString directly
  if (isValidElement(code)) {
    return reactElementToJSXString(code, reactElementToJSXStringOptions);
  }

  // if it's array, we need to pass elemenets one by one
  if (Array.isArray(code)) {
    return code
      .map((markupItem) =>
        reactElementToJSXString(markupItem, reactElementToJSXStringOptions)
      )
      .join('\n');
  }

  // if it's text, return it
  if (typeof code === 'string') {
    return code;
  }

  return '';
};

const useCodeExample = ({ code, type, JSXOptions }: UseCodeExample): string => {
  switch (type) {
    case 'html':
      return typeof code === 'string'
        ? unescape(code)
        : pretty(renderToStaticMarkup(code as React.ReactElement));
    case 'jsx':
      return getJSXAsStringFromCode({
        code,
        JSXOptions,
      });
  }
};

export default useCodeExample;
