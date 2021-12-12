import React from "react";
import Link from "next/link";
import { Select, Button } from "components";

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
          { label: "Item 1", value: "item 1" },
          { label: "Item 2", value: "item 2" },
          { label: "Item 3", value: "item 3" },
        ]}
      />
      <Button>Button</Button>
      <Link href="/">
        <a>Back home</a>
      </Link>
    </>
  );
}
