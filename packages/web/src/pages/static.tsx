import Link from 'next/link';
import { Example } from 'components';

export default function Home() {
  return (
    <>
      <h1>Hello from Static world!</h1>
      <p>
        This page don't have React runtime. But we run here JS from
        "components/static.ts" file.
      </p>
      <Example>This is example of Example component</Example>
      <Link href="/">
        <a>Back home</a>
      </Link>
    </>
  );
}
