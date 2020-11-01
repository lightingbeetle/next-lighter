type DocgenInfo = {
  description: string;
  displayName: string;
  props: {
    [key: string]: {
      defaultValue?: string;
      name: string;
      description: string;
      required: boolean;
      type: {
        name: string;
      };
    };
  };
};

type UsePropsDocs = {
  component: React.Component & {
    __docgenInfo?: DocgenInfo;
  };
};

const usePropsDocs = ({ component }: UsePropsDocs): DocgenInfo => {
  const info = component.__docgenInfo;

  if (!info) {
    return {
      displayName: null,
      description: null,
      props: null,
    };
  }

  return {
    displayName: info.displayName,
    description: info.description,
    props: info.props,
  };
};

type PropsProps = {
  component: React.Component;
};

const Props = ({ component }: PropsProps) => {
  const { displayName, props } = usePropsDocs({ component });

  // component don't have props?
  if (!props) {
    return null;
  }

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
          {Object.keys(props).map((propName) => (
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

export default Props;
