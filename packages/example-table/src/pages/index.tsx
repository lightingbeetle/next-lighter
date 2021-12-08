import React from "react";
import Link from "next/link";
import { Button } from "components";

export default function Home() {
  return (
    <>
      <h1>Table examples</h1>
      <p>How to use tables in projects</p>
      <ul>
        <li>
          <Link href="/static">
            <a>With static data</a>
          </Link>
        </li>
        <li>
          <Link href="/fetched">
            <a>With fetched data</a>
          </Link>
        </li>
        <li>
          <Link href="/filter">
            <a>With filter</a>
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
