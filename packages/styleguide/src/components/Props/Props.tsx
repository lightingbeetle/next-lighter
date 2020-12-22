import React from "react";
import PropsTable from "./PropsTable";
import useProps from "./useProps";
import PropsContext from "./usePropsContext";

type PropsProps = {
  component: React.Component;
  children: React.ReactNode;
};

const Props = ({ component, children }: PropsProps) => {
  const { displayName, props, description } = useProps({ component });

  return (
    <PropsContext.Provider value={{ displayName, props, description }}>
      {children || <PropsTable />}
    </PropsContext.Provider>
  );
};

export default Props;
