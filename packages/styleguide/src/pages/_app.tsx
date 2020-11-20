import Link from "next/link";
import { Navigation } from "../components";
import Styleguide from "../components/Styleguide";

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
    <Styleguide sidebarArea={<Navigation routes={routes} />}>
      <Component {...pageProps} />
    </Styleguide>
  );
}

export default MyApp;
