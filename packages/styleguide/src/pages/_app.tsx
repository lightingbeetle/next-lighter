import NextLink from "next/link";
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
    <Styleguide routes={routes} currentPage="Page" adminHref="/">
      <Component {...pageProps} />
    </Styleguide>
  );
}

export default MyApp;
