import styles from "@/styles/articlePage.module.scss";

import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticle } from "@/lib/cms";

interface ArticlePage {
  params: {
    numero: string;
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePage) {
  const { numero, slug } = params;
  const article = await getArticle(slug);
  const authors = article.autorCollection.items;
  return (
    <>
      <article className={styles.article}>
        {/* <div className={styles.type}>ENTREVISTA</div> */}
        <h1>{article.titulo}</h1>
        {article.subtitulo && <h2> {article.subtitulo} </h2>}
        <div className={styles.authors}>
          {authors.map((item, i) => {
            return (
              <div className={styles.author} key={i}>
                <address>{item.nombre}</address>
                <p>{item.bio}</p>
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
        />
        {article.creditosPortada && (
          <div className={styles.coverCredits}> {article.creditosPortada}</div>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.body}>
          {article.cuerpo}
        </ReactMarkdown>
      </article>
    </>
  );
}

// export async function generateStaticParams(slug: any) {
//   // const { numero, slug } = params;
//   console.log(slug);
//   // const issue = await getIssue(numero);
//   // console.log("holi: ", numero);
//   // const contents = issue.indiceCollection.items;
//   // console.log(contents);
//   const articles = await getArticlesSlug();
//   return articles.map((article) => ({ slug: article.slug }));
// }

// export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePage): Promise<Metadata> {
  const { slug } = params;
  const article = await getArticle(slug);
  return {
    title: article.titulo,
    openGraph: {
      images: article.portada.url,
    },
  };
}
