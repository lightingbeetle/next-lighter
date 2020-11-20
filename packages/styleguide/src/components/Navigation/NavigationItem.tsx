import { Link } from "../Typography";
import { LinkProps } from "../Typography/Link";
import { useNavigationContext } from "./useNavigationContext";

export type NavigationItemProps = {
  title: React.ReactNode;
  href?: LinkProps["href"];
  routes?: NavigationItemProps[];
};

const NavigationItem = ({ title, href, routes }: NavigationItemProps) => {
  const { activePage } = useNavigationContext();
  return (
    <li>
      {href ? (
        <Link href={href}>
          {title} {href === activePage && "(current)"}
        </Link>
      ) : (
        <span>{title}</span>
      )}
      {routes && (
        <ul>
          {routes.map((route, index) => (
            <NavigationItem key={index} {...route} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavigationItem;
