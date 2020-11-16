import { usePropsContext } from "./usePropsContext";

const PropsTable = () => {
  const { displayName, props } = usePropsContext();
  return (
    <>
      Name: <b>{displayName}</b>
      <table
        style={{ textAlign: "left", border: "1px solid #333", width: "100%" }}
      >
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
      </table>
    </>
  );
};

export default PropsTable;
