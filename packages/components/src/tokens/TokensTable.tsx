import React, { useMemo } from "react";

import { Table, Code } from "@lighting-beetle/lighter-styleguide";

function TableTokens({ data }) {
  const memoizedData = useMemo(() => data, [data]);
  const columns = useMemo(
    () => [
      {
        accessor: "token",
        Header: "Token"
      },
      {
        accessor: "value",
        Header: "Value"
      },
      {
        accessor: "usageJS",
        Header: "JS usage",
        Cell: ({ value }) => <Code language="javascript">{value}</Code>
      },
      {
        accessor: "usageSCSS",
        Header: "SCSS usage",
        Cell: ({ value }) => <Code language="scss">{value}</Code>
      }
    ],
    []
  );

  return <Table columns={columns} data={memoizedData} />;
}

export default TableTokens;

type RenderToken = {
  name: string;
  key: string;
  value: string;
};

type PrepareTokens = {
  name: string;
  tokensMap: object[];
  renderValue?: (args: RenderToken) => string | void;
  renderExample: (args: RenderToken) => string | void;
  renderUsageJS: (args: RenderToken) => string | void;
  renderUsageSCSS: (args: RenderToken) => string | void;
};

export function prepareTokens({
  name,
  tokensMap,
  renderValue,
  renderExample = () => {},
  renderUsageJS = () => {},
  renderUsageSCSS = () => {}
}: PrepareTokens) {
  return Object.keys(tokensMap).map(key => ({
    token: `${name}.${key}`,
    value:
      renderValue?.({ name, key, value: tokensMap[key] }) ?? tokensMap[key],
    example: renderExample({ name, key, value: tokensMap[key] }),
    usageJS: renderUsageJS({ name, key, value: tokensMap[key] }),
    usageSCSS: renderUsageSCSS({ name, key, value: tokensMap[key] })
  }));
}
