import NavigationItem from "./NavigationItem";
import { useNavigationContext } from "./useNavigationContext";

const NavigationTree = () => {
  const { routes } = useNavigationContext();
  return routes ? (
    <ul>
      {routes.map((route, index) => (
        <NavigationItem key={index} {...route} />
      ))}
    </ul>
  ) : null;
};

export default NavigationTree;
