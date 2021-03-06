import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello world!</h1>
      <p>From example project based on Lighter ecosystem</p>
      <ul>
        <li>
          <Link href="/about">
            <a>About this example</a>
          </Link>
        </li>
        <li>
          <Link href="/static">
            <a>Static page example (without React)</a>
          </Link>
        </li>
        <li>
          <Link href="https://next-lighter-styleguide.lbx.sk/">
            <a>Lighter Styleguide docs</a>
          </Link>
        </li>
        <li>
          <Link href="https://next-lighter-design-system.lbx.sk/">
            <a>Lighter Design System</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
