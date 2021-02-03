import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello world!</h1>
      <ul>
        <li>
          <Link href="/design-system">
            <a>Design system</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/static">
            <a>Static page (without React)</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
