import Link from "next/link";

export default function Index({ posts }) {
  return (
    <>
      <h1>Hello!</h1>
      <p>This is example of Wordpress backed Next.js website</p>
      <ul>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href={`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-admin`}>
            <a>Wordpress admin</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
