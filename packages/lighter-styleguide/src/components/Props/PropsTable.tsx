import React, { useMemo } from "react";
import styled from "styled-components";
import { usePropsContext } from "./usePropsContext";
import { theme } from "../../styles";
import Table from "../Table";

const ComponentName = styled.div`
  padding: ${(props) => props.theme.space.small} 0;
`;

ComponentName.defaultProps = {
  theme,
};

const PropsTable = () => {
  const { displayName, props = {} } = usePropsContext();

  const data = useMemo(
    () => Object.keys(props).map((key) => props[key]),
    [props]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Required",
        accessor: "required",
        Cell: ({ value }) => value && "Yes",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Type",
        accessor: (row) => {
          if (row.type.raw === "boolean") {
            return row.type.raw;
          }

          const valueString =
            row.type.value &&
            row.type.value.map(({ value }) => value).join(" | ");

          if (valueString) {
            return valueString;
          }

          return row.type.raw || row.type.name;
        },
        id: "type",
      },
      {
        Header: "Default value",
        accessor: "defaultValue.value",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  return (
    <>
      <ComponentName>
        Component: <b>{displayName}</b>
      </ComponentName>
      <Table columns={columns} data={data} />
    </>
  );
};

export default PropsTable;
