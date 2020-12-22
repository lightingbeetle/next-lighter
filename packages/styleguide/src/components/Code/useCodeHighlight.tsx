import React, { useMemo } from "react";
import Prism, {
  defaultProps,
  Language,
  PrismTheme
} from "prism-react-renderer";

import vsCodeLightTheme from "./vsCodeLightTheme";

export type UseCodeHighlight = {
  code: string;
  language: Language;
  theme?: PrismTheme;
  inline?: boolean;
};

const useCodeHighlight = ({
  code,
  language = "markup",
  theme = vsCodeLightTheme,
  inline = true
}: UseCodeHighlight) => {
  const { highlight } = useMemo(() => {
    const Tag = inline ? "span" : "div";

    const highlight = (
      <Prism {...defaultProps} code={code} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          const toHighlight = tokens.map((line, i) => (
            <Tag {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </Tag>
          ));

          const code = (
            <code
              style={{ ...style, display: inline ? "inline-block" : "block" }}
              className={`code prism-code ${className}`}
            >
              {toHighlight}
            </code>
          );

          return inline ? code : <pre>{code}</pre>;
        }}
      </Prism>
    );

    return {
      highlight
    };
  }, [code, language, theme, inline]);

  return { highlight };
};

export default useCodeHighlight;
