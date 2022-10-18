import React from "react";
import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardSection, CardSectionImage } from "components";
import { getStrapiURL } from "../lib/api";
import { getArticles } from "../queries/articles";

const ArticleCard = ({
  id,
  title,
  slug,
  excerpt,
  image: { alt, src, width, height },
}: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: {
    alt: string;
    src: string;
    width: string;
    height: string;
  };
}) => {
  return (
    <Card>
      <CardSectionImage>
        <Image
          src={getStrapiURL(src)}
          alt={alt}
          width={width}
          height={height}
        />
      </CardSectionImage>
      <CardSection>
        <h2>
          <Link href={`/blog/${id}/${slug}`}>
            <a>{title}</a>
          </Link>
        </h2>
        <p>{excerpt}</p>
      </CardSection>
    </Card>
  );
};

const Home = ({
  articles,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container">
      {preview && (
        <>
          This page is a preview. <a href="/api/exit-preview">Click here</a> to
          exit preview mode.
        </>
      )}
      <h1>Example Strapi blog</h1>
      <p>
        <a href="https://github.com/lightingbeetle/next-lighter/blob/main/packages/example-strapi/README.md">
          Readme
        </a>
      </p>
      <h2>Articles</h2>
      <ul className="articles">
        {articles.map(({ id, attributes: { slug, title, excerpt, image } }) => (
          <li key={slug}>
            <ArticleCard
              id={id}
              title={title}
              slug={slug}
              excerpt={excerpt}
              image={{
                src: image.data.attributes.url,
                alt: image.data.attributes.alternativeText,
                width: image.data.attributes.width,
                height: image.data.attributes.height,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps({ preview = false }) {
  // Run API calls in parallel
  const [articles] = await Promise.all([getArticles()]);

  return {
    props: {
      articles,
      preview,
    },
  };
}

export default Home;
