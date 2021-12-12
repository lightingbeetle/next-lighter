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
          <Link href="/contact">
            <a>Contact form</a>
          </Link>
        </li>
      </ul>
      <h2>Insights</h2>
      <ul>
        <li>
          <a href="https://accessibility.blog.gov.uk/2016/07/22/using-the-fieldset-and-legend-elements/">
            Using the fieldset and legend elements
          </a>{" "}
          only in single multiple choice question or you have several questions
          relating to the same topic.
        </li>
        <li>
          Try to provide customized validation messages (
          <Link href="/simple">
            <a>Simple form</a>
          </Link>
          )
        </li>
        <li>
          Form elemtents id's are there just for the connection with `<label />
          `. Make sure all form components have uniqe id and use `useId` from
          React if possible. Attribute `name` is important, because that{" "}
          <a href="ec.whatwg.org/multipage/forms.html#configuring-a-form-to-communicate-with-a-server">
            will be send to server
          </a>{" "}
          for collection `value`.
        </li>
        <li>
          TODO: Why we use{" "}
          <a href="https://react-hook-form.com/">react-hook-form</a> (Benefits,
          challenges...)?
        </li>
      </ul>
    </>
  );
}
