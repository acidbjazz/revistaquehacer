import styles from "@/styles/issuePage.module.scss";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticle, getIssue, getIssues } from "@/lib/cms";
import { formatAuthors } from "@/lib/utils";

interface IssuePage {
  params: {
    numero: string;
  };
}

export default async function IssuePage({ params }: IssuePage) {
  const { numero } = params;
  const issue = await getIssue(numero);
  const contents = issue.indiceCollection.items;
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.date}>
          Nº {numero} {issue.fecha}
        </div>
        <h1>{issue.titulo}</h1>
        <ReactMarkdown className={styles.abstract}>{issue.sumilla}</ReactMarkdown>
        <Image
          className={styles.cover}
          src={issue.portada.url}
          alt="cover"
          width={1920}
          height={1080}
          sizes="100vw"
        />
      </section>
      <section className={styles.introduction}>
        <h2>PRESENTACIÓN</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.body}>
          {issue.presentacion}
        </ReactMarkdown>
      </section>
      <section className={styles.contents}>
        <h2>CONTENIDO</h2>
        <div className={styles.index}>
          {contents.map(async (item) => {
            if (item.__typename === "Seccion") {
              return <div className={styles.section}>{item.titulo}</div>;
            } else {
              const article = await getArticle(item.slug);
              return (
                <Link href={`./${numero}/${item.slug}`} className={styles.article}>
                  <span>{item.titulo}</span> / {formatAuthors(article.autorCollection.items)}
                </Link>
              );
            }
          })}
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((issue) => ({ numero: issue.numero.toString() }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: IssuePage): Promise<Metadata> {
  const { numero } = params;
  const issue = await getIssue(numero);
  return {
    title: issue.titulo,
    openGraph: {
      images: issue.portada.url,
    },
  };
}
