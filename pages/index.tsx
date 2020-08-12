import Link from 'next/link';
import Example from '../components/example/Example';

export default function Home() {
  return (
    <>
      <h1>Hello world!</h1>
      <Example>Example</Example>
      <ul>
        <li>
          <Link href="/admin">
            <a>Admin</a>
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
