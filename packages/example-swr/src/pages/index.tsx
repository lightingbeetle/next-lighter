import React from "react";
import Link from "next/link";
import { Button } from "components";

export default function Home() {
  return (
    <>
      <h1>SWR Examples</h1>
      <p>
        How to use{" "}
        <a href="https://swr.vercel.app/" target="_blank" rel="noreferrer">
          swr
        </a>{" "}
        in our projects
      </p>
      <ul>
        <li>
          <Link href="/simple">
            <a>Simple fetch</a>
          </Link>
        </li>
        <li>
          <Link href="/dependent">
            <a>Dependent fetch</a>
          </Link>
        </li>
      </ul>
      <h2>Useful links</h2>
      <ul>
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
        <li>
          <Link href="https://next-lighter-wordpress.lbx.sk/">
            <a>Wordpress integration example</a>
          </Link>
        </li>
      </ul>
      <h2>Import example</h2>
      <p>This is example of Button component imported from `components`</p>
      <Button>This do nothing</Button>
    </>
  );
}
