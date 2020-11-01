import { useMemo } from "react";
import Prism, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer";

import oneDarkProTheme from "./oneDarkProTheme";

export type UseCodeHighlight = {
  code: string;
  language: Language;
  theme?: PrismTheme;
  inline?: boolean;
};

const useCodeHighlight = ({
  code,
  language = "markup",
  theme = oneDarkProTheme,
  inline = true,
}: UseCodeHighlight) => {
  const { highlight } = useMemo(() => {
    const Tag = inline ? "span" : "div";

    const highlight = (
      <Prism code={code} language={language} theme={theme} {...defaultProps}>
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
              className={`code prism-code language-${language} ${className}`}
            >
              {toHighlight}
            </code>
          );

          return inline ? code : <pre>{code}</pre>;
        }}
      </Prism>
    );

    return {
      highlight,
    };
  }, [code, language, theme, inline]);

  return { highlight };
};

export default useCodeHighlight;
