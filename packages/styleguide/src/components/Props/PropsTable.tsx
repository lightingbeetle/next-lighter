import styled from "styled-components";
import { usePropsContext } from "./usePropsContext";
import { theme } from "../../styles";
import { rem } from "../../styles/utils";

const StyledResponsiveTable = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const Table = styled.table`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.color.black};
  font-size: ${props => props.theme.font.size.default};
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: ${props => props.theme.space.medium};
  max-width: 100%;
  width: 100%;

  th {
    border: ${props => `1px solid ${props.theme.color.grey}`};
    vertical-align: middle;
    text-align: left;
    font-weight: ${props => props.theme.font.weight.bold};
  }
  th,
  td {
    padding: ${props => props.theme.space.small};
  }
  td {
    min-height: ${rem("48px")};
    border: ${props => `1px solid ${props.theme.color.grey}`};
    vertical-align: top;
    & > *:last-child {
      margin-bottom: 0;
    }
  }
`;

Table.defaultProps = {
  theme
};

const ComponentName = styled.div`
  padding: ${props => props.theme.space.small} 0;
`;

ComponentName.defaultProps = {
  theme
};

const PropsTable = () => {
  const { displayName, props } = usePropsContext();
  return (
    <>
      <ComponentName>
        Component: <b>{displayName}</b>
      </ComponentName>
      <StyledResponsiveTable>
        <Table>
          <thead>
            <tr>
              <th>Required</th>
              <th>Name</th>
              <th>Type</th>
              <th>Default value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props).map(propName => (
              <tr key={props[propName].name}>
                <td>{props[propName].required && "Yes"}</td>
                <td>{props[propName].name}</td>
                <td>{props[propName].type.name}</td>
                <td>{props[propName].defaultValue}</td>
                <td>{props[propName].description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledResponsiveTable>
    </>
  );
};

export default PropsTable;
