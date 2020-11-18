import { useNavigationContext } from "./useNavigationContext";

const NavigationTree = () => {
  const { children } = useNavigationContext();
  return <ul>{children}</ul>;
};

export default NavigationTree;
