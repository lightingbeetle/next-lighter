import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { fetchAPIWithAuth, getStrapiURL } from "../../lib/api";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

const Article = ({
  title,
  excerpt,
  image: { alt, src, width, height },
  content,
}: {
  title: string;
  excerpt: string;
  image: {
    alt: string;
    src: string;
    width: string;
    height: string;
  };
  content: MDXRemoteSerializeResult;
}) => {
  return (
    <>
      <div>
        <Image
          src={getStrapiURL(src)}
          alt={alt}
          width={width}
          height={height}
        />
        <h1>{title}</h1>
        <p>{excerpt}</p>
        <hr />
        <MDXRemote {...content} />
      </div>
      <div>
        <Link href="/">
          <a>Back to homepage</a>
        </Link>
      </div>
    </>
  );
};

type ArticleStrapi = {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    slug: string;
    content: string | MDXRemoteSerializeResult;
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

// FIXME: Not sure why InferGetStaticPropsType not working here
const BlogPage = ({ article }: { article: ArticleStrapi }) => {
  const {
    attributes: { title, excerpt, image, content },
  } = article;
  return (
    <Article
      content={content as MDXRemoteSerializeResult}
      title={title}
      excerpt={excerpt}
      image={{
        src: image.data.attributes.url,
        alt: image.data.attributes.alternativeText,
        width: image.data.attributes.width,
        height: image.data.attributes.height,
      }}
    />
  );
};

export default BlogPage;

interface IParams extends ParsedUrlQuery {
  slug: [id: string, slug: string];
}

export async function getStaticProps({ params }: { params: IParams }) {
  const article = await fetchAPIWithAuth<{ data: ArticleStrapi }>(
    `/articles/${params.slug[0]}`,
    { populate: "*" }
  );

  article.data.attributes.content = await serialize(
    article.data.attributes.content as string
  );

  return {
    props: {
      article: article.data,
    },
  };
}

export const getStaticPaths = async () => {
  const postPathsData = await fetchAPIWithAuth<{ data: ArticleStrapi[] }>(
    "/articles"
  );

  const paths = postPathsData.data.map(({ id, attributes: { slug } }) => ({
    params: { slug: [id.toString(), slug] },
  }));

  return {
    paths: [...paths],
    fallback: false,
  };
};
