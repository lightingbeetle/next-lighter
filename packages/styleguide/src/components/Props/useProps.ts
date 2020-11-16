export type Props = {
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

type DocgenInfo = {
  description: string;
  displayName: string;
  props: Props;
};

type UseProps = {
  component: React.Component & {
    __docgenInfo?: DocgenInfo;
  };
};

const useProps = ({ component }: UseProps): DocgenInfo => {
  const info = component.__docgenInfo;

  return {
    displayName: info?.displayName,
    description: info?.description,
    props: info?.props
  };
};

export default useProps;
