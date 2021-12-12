import React from "react";
import { useTableContext } from "./useTableContext";

import styled from "styled-components";
import { theme } from "../../styles";
import { rem } from "../../styles/utils";

const StyledResponsiveTable = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const StyledTable = styled.table`
  font-family: ${(props) => props.theme.font.family};
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.font.size.default};
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: ${(props) => props.theme.space.medium};
  max-width: 100%;
  width: 100%;

  th {
    border: ${(props) => `1px solid ${props.theme.color.grey}`};
    vertical-align: middle;
    text-align: left;
    font-weight: ${(props) => props.theme.font.weight.bold};
  }
  th,
  td {
    padding: ${(props) => props.theme.space.small};
  }
  td {
    min-height: ${rem("48px")};
    border: ${(props) => `1px solid ${props.theme.color.grey}`};
    vertical-align: top;
    & > *:last-child {
      margin-bottom: 0;
    }
  }
`;

StyledTable.defaultProps = {
  theme,
};

const TableUI = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableContext();

  return (
    <StyledResponsiveTable>
      <StyledTable {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </StyledTable>
    </StyledResponsiveTable>
  );
};

export default TableUI;
