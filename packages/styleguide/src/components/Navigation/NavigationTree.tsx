import NavigationItem from "./NavigationItem";
import NavigationList from "./NavigationList";
import { useNavigationContext } from "./useNavigationContext";

const NavigationTree = () => {
  const { routes } = useNavigationContext();
  return routes ? (
    <NavigationList>
      {routes.map((route, index) => (
        <NavigationItem key={index} {...route} />
      ))}
    </NavigationList>
  ) : null;
};

export default NavigationTree;
