import { Link } from "../Typography";
import { useNavigationContext } from "./useNavigationContext";

type NavigationItemProps = {
  title: React.ReactNode;
  href: string;
  children?: React.ReactNode;
};

const NavigationItem = ({ title, children, href }: NavigationItemProps) => {
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
      {children && <ul>{children}</ul>}
    </li>
  );
};

export default NavigationItem;
