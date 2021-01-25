import Link from "next/link";
import { Select } from "components";

export default function Home() {
  return (
    <>
      <h1>Hello from Static world!</h1>
      <p>
        This page don't have React runtime. But we run here JS from
        "components/static.ts" file.
      </p>
      <Select
        items={[
          { label: "Item 1", value: "Item 1" },
          { label: "Item 2", value: "Item 2" },
          { label: "Item 3", value: "Item 3" }
        ]}
      />
      <Link href="/">
        <a>Back home</a>
      </Link>
    </>
  );
}
