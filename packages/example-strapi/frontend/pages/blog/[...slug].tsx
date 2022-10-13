import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { fetchAPI, getStrapiURL } from "../../lib/api";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getArticleBySlug } from "../../queries/articles";

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
    <div className="article">
      <Image src={getStrapiURL(src)} alt={alt} width={width} height={height} />
      <h1>{title}</h1>
      <p>{excerpt}</p>
      <hr />
      <MDXRemote {...content} />
    </div>
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
    <div className="container container--center">
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
      <div>
        <Link href="/">
          <a>Back to homepage</a>
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;

interface IParams extends ParsedUrlQuery {
  slug: [id: string, slug: string];
}

export async function getStaticProps({ params }: { params: IParams }) {
  const article = await getArticleBySlug({ slug: params.slug[1] });

  // TODO: content should be modified to MDXRemoteSerializeResult
  article.attributes.content = (await serialize(
    article.attributes.content
  )) as any;

  return {
    props: {
      article,
    },
  };
}

export const getStaticPaths = async () => {
  const articlesPathsData = await fetchAPI<{
    articles: { data: { id: string; attributes: { slug: string } }[] };
  }>(
    `
      query getArticlesSlugs {
        articles {
          data {
            id
            attributes {
              slug
            }
          }
        }
      }
      `
  );

  const paths = articlesPathsData.articles.data.map(
    ({ id, attributes: { slug } }) => ({
      params: { slug: [id.toString(), slug] },
    })
  );

  return {
    paths: [...paths],
    fallback: false,
  };
};
