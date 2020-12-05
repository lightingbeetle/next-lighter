import NextLink from "next/link";
import { Navigation, Link, H2, H4 } from "../components";
import Header, { HeaderLogo } from "../components/Header";
import Styleguide from "../components/Styleguide";
import "modern-normalize/modern-normalize.css";

const routes = [
  {
    title: "Home",
    href: <NextLink href="/" passHref />
  },
  {
    title: "Components",
    routes: [
      {
        title: "Navigation",
        href: <NextLink href="/Navigation" passHref />
      },
      {
        title: "Preview",
        href: <NextLink href="/Preview" passHref />
      },
      {
        title: "Props",
        href: <NextLink href="/Props" passHref />
      },
      {
        title: "Typography",
        href: <NextLink href="/Typography" passHref />
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
            <NextLink href="/" passHref>
              <HeaderLogo src="/logo.svg" />
            </NextLink>
          }
          mainArea={<H4 as="div">Page title</H4>}
          actionArea={
            <NextLink href="/" passHref>
              <Link>Admin</Link>
            </NextLink>
          }
        />
      }
    >
      <Component {...pageProps} />
    </Styleguide>
  );
}

export default MyApp;
