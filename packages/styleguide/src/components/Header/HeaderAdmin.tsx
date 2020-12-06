import { useStyleguideContext } from "../Styleguide/useStyleguideContext";
import { Link } from "..";
import HeaderItem from "./HeaderItem";

const HeaderAdmin = () => {
  const { adminHref } = useStyleguideContext();

  if (!adminHref) {
    return null;
  }

  return (
    <HeaderItem>
      <Link href={adminHref}>Admin</Link>
    </HeaderItem>
  );
};

export default HeaderAdmin;
