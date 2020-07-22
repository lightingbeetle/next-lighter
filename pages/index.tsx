import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Hello world!</h1>
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
      </ul>
    </>
  );
}
