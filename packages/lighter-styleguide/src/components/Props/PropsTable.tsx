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

  const data = useMemo(() => Object.keys(props).map((key) => props[key]), [
    props,
  ]);

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
        accessor: "type.name",
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
