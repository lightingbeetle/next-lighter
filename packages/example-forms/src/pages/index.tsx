import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Forms examples</h1>
      <p>How to use forms in our projects</p>
      <ul>
        <li>
          <Link href="/simple">
            <a>Simple form</a>
          </Link>
        </li>
        <li>
          <Link href="/recaptcha">
            <a>Recaptcha form</a>
          </Link>
        </li>
        <li>
          <Link href="/complex">
            <a>Complex form</a>
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
    </>
  );
}
