import React from "react";
import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchAPIWithAuth, getStrapiURL } from "../lib/api";

type Article = {
  id: string;
  attributes: {
    title: string;
    excerpt: string;
    slug: string;
    image: {
      data: {
        attributes: {
          alternativeText: string;
          url: string;
          width: string;
          height: string;
        };
      };
    };
  };
};

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
    <div>
      <Image src={getStrapiURL(src)} alt={alt} width={width} height={height} />
      <h2>
        <Link href={`/blog/${id}/${slug}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <p>{excerpt}</p>
    </div>
  );
};

const Home = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul>
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
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles] = await Promise.all([
    fetchAPIWithAuth<{ data: Article[] }>("/articles", { populate: "*" }),
  ]);

  return {
    props: {
      articles: articles.data,
    },
  };
}

export default Home;
