import Link from "next/link";
import { Navigation } from "../components";
import Header, { HeaderLogo } from "../components/Header";
import Styleguide from "../components/Styleguide";
import "modern-normalize/modern-normalize.css";
import HeaderTitle from "../components/Header/HeaderTitle";

const routes = [
  {
    title: "Home",
    href: <Link href="/" passHref />
  },
  {
    title: "Components",
    routes: [
      {
        title: "Navigation",
        href: <Link href="/Navigation" passHref />
      },
      {
        title: "Preview",
        href: <Link href="/Preview" passHref />
      },
      {
        title: "Props",
        href: <Link href="/Props" passHref />
      },
      {
        title: "Typography",
        href: <Link href="/Typography" passHref />
      }
    ]
  }
];

function MyApp({ Component, pageProps }) {
  return (
    <Styleguide
      sidebarArea={<Navigation routes={routes} />}
      headerArea={
        <Header
          logoArea={
            <Link href="/" passHref>
              <HeaderLogo src="/logo.svg" />
            </Link>
          }
          titleArea={<HeaderTitle>Page title</HeaderTitle>}
        />
      }
    >
      <Component {...pageProps} />
    </Styleguide>
  );
}

export default MyApp;
