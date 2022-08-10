// TODO
// - Make this styleguide component
// - introduce `usageFormat: 'variable' | 'function'` to set better defaults?

import React, { useMemo } from "react";

import { Table, Code } from "@lighting-beetle/lighter-styleguide";
import flattenObject from "../utils/flattenObject";
import { SCSSVarsMap } from "../utils/scssVarsToMap";

type UsageFormatFunc = ({
  token,
  name,
}: {
  token: string;
  name: string;
}) => string;

type TableTokensProps = {
  tokens: SCSSVarsMap;
  name: string;
  usageFormatJS: UsageFormatFunc | null;
  usageFormatSCSS: UsageFormatFunc | null;
  usageFormatCSS: UsageFormatFunc | null;
};

const usageFormatDefault = ({ token, name }) =>
  `${name}(${token
    .split(".")
    .map((part) => (part !== "default" ? `'${part}'` : ""))
    .join(",")})`;

const usageFormatCSSDefault = ({ token, name }) =>
  `var(--${name}-${token.replace(".", "-")})`;

function TableTokens({
  tokens = {},
  name,
  usageFormatJS = usageFormatDefault,
  usageFormatSCSS = usageFormatDefault,
  usageFormatCSS = usageFormatCSSDefault,
}: TableTokensProps) {
  const data = useMemo(() => {
    const flattenTokens = flattenObject(tokens);

    return Object.keys(flattenTokens).map((token) => ({
      token,
      value: flattenTokens[token],
    }));
  }, [tokens]);

  const columns = useMemo(
    () =>
      [
        {
          accessor: "token",
          Header: "Token",
          id: "token",
          Cell: ({ value }) => `${name}.${value}`,
        },
        {
          accessor: "value",
          Header: "Value",
          id: "value",
        },
        usageFormatCSS && {
          accessor: "token",
          Header: "CSS usage",
          Cell: ({ value: token }) => (
            <Code language="css">{usageFormatCSS({ token, name })}</Code>
          ),
          id: "cssUsage",
        },
        usageFormatJS && {
          accessor: "token",
          Header: "JS usage",
          id: "jsUsage",
          Cell: ({ value: token }) => (
            <Code language="javascript">{usageFormatJS({ token, name })}</Code>
          ),
        },
        usageFormatSCSS
          ? {
              accessor: "token",
              Header: "SCSS usage",
              Cell: ({ value: token }) => (
                <Code language="scss">{usageFormatSCSS({ token, name })}</Code>
              ),
              id: "scssUsage",
            }
          : false,
        // ts don't do well filter(Boolean) infer type
        // https://github.com/microsoft/TypeScript/issues/16069
      ].filter(Boolean) as React.ComponentProps<typeof Table>["columns"],
    [name, usageFormatSCSS, usageFormatJS, usageFormatCSS]
  );

  return <Table columns={columns} data={data} />;
}

export default TableTokens;
