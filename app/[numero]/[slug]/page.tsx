import styles from "@/styles/articlePage.module.scss";

import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticle } from "@/lib/cms";
import { formatAuthors } from "@/lib/utils";

interface ArticlePage {
  params: {
    numero: string;
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePage) {
  const { numero, slug } = params;
  const article = await getArticle(numero, slug);
  const authors = article.autorCollection.items;
  return (
    <>
      <article className={styles.article}>
        <div className={styles.type}>{article.section}</div>
        <h1>{article.titulo}</h1>
        {article.subtitulo && <h2> {article.subtitulo} </h2>}
        <div className={styles.authors}>
          {authors.map((author, i) => {
            return (
              <div className={styles.author} key={i}>
                <address>{author.nombre}</address>
                {author.bio && <p>{author.bio}</p>}
              </div>
            );
          })}
        </div>
        <Image
          className={styles.cover}
          src={article.portada.url}
          width={960}
          height={1080}
          alt={article.titulo}
          priority={true}
        />
        {article.creditosPortada && (
          <div className={styles.coverCredits}> {article.creditosPortada}</div>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.body}>
          {article.cuerpo}
        </ReactMarkdown>
      </article>

      {article.next && (
        <div className={styles.next}>
          <h2 className={styles.nextTitle}>siguiente artículo</h2>
          <div className={styles.type}>{article.next.section}</div>
          <a href={article.next.slug} className={styles.title}>
            <h1>{article.next.titulo}</h1>
          </a>
          {article.next.subtitulo && <h2> {article.next.subtitulo} </h2>}
          <div className={styles.authors}>{formatAuthors(article.next.autorCollection.items)}</div>
          <a href={article.next.slug} className={styles.cover}>
            <Image src={article.next.portada.url} width={960} height={1080} alt={article.titulo} />
          </a>
        </div>
      )}
    </>
  );
}

// export async function generateStaticParams() {
// const articles = await getArticlesSlug();
// return articles.map((article) => ({ slug: article.slug }));
//   return [
//     { numero: "11", slug: "el-estallido-social-2022-2023" },
//     { numero: "11", slug: "crisis-y-movilizacion-indigena-retorno-desde-lo-cholo-a-lo-indio" },
//   ];
// }

// export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePage): Promise<Metadata> {
  const { numero, slug } = params;
  const article = await getArticle(numero, slug);
  return {
    title: {
      absolute: `${article.titulo} | ${formatAuthors(article.autorCollection.items)}`,
    },
    description: `Revista Quehacer Nº ${numero}`,
    openGraph: {
      type: "website",
      title: {
        absolute: `${article.titulo} | ${formatAuthors(article.autorCollection.items)}`,
      },
      description: `Revista Quehacer Nº ${numero}`,
      url: `/${numero}/${slug}`,
      images: article.portada.url,
    },
    twitter: {
      card: "summary_large_image",
      title: {
        absolute: `${article.titulo} | ${formatAuthors(article.autorCollection.items)}`,
      },
      description: `Revista Quehacer Nº ${numero}`,
      images: article.portada.url,
    },
  };
}
