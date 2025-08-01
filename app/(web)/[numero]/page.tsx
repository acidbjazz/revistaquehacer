import styles from "@/styles/issuePage.module.scss";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Article, Section } from "@/lib/interfaces";
import { getIssue, getIssues } from "@/lib/cms";
import { formatAuthors } from "@/lib/utils";
import NextArticle from "@/components/nextArticle";

// interface IssuePage {
//   params: {
//     numero: string;
//   };
// }

interface IssuePage {
  params: Promise<{
    numero: string;
  }>;
}

export default async function IssuePage({ params }: IssuePage) {
  const { numero } = await params;
  const issue = await getIssue(numero);
  const contents = issue.indiceCollection.items;
  const first: Article = contents.find((article) => article.__typename === "Articulo") as Article;
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.date}>
          Nº {numero} {issue.fecha}
        </div>
        <h1>{issue.titulo}</h1>
        {issue.sumilla && (
          <ReactMarkdown className={styles.abstract}>{issue.sumilla}</ReactMarkdown>
        )}
        <Image
          className={styles.cover}
          src={issue.portada.url}
          alt="cover"
          width={1920}
          height={1080}
          sizes="100vw"
          priority={true}
        />
        <ReactMarkdown className={styles.coverCredits}>{issue.creditosPortada}</ReactMarkdown>
      </section>
      <section className={styles.contents}>
        <h2>CONTENIDO</h2>
        <div className={styles.index}>
          {contents.map(async (item) => {
            if (item) {
              if (item.__typename === "Seccion") {
                const itemSection = item as Section;
                return (
                  <div className={styles.section} key={item.sys.id}>
                    {itemSection.titulo}
                  </div>
                );
              } else if (item.__typename === "Articulo") {
                const itemArticle = item as Article;
                return (
                  <Link
                    href={`./${numero}/${itemArticle.slug}`}
                    className={styles.article}
                    key={itemArticle.sys.id}
                  >
                    <span>{itemArticle.titulo}</span> /{" "}
                    {formatAuthors(itemArticle.autorCollection.items)}
                  </Link>
                );
              }
            }
          })}
        </div>
      </section>
      <section className={styles.introduction}>
        <h2>PRESENTACIÓN</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.body}>
          {issue.presentacion}
        </ReactMarkdown>
      </section>
      <NextArticle issue={numero} article={first} />
    </>
  );
}

export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((issue) => ({ numero: issue.numero.toString() }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: IssuePage): Promise<Metadata> {
  const { numero } = await params;
  const issue = await getIssue(numero);
  return {
    title: issue.titulo,
    description: `Nº ${numero} ${issue.fecha}`,
    openGraph: {
      type: "website",
      title: issue.titulo,
      description: `Nº ${numero} ${issue.fecha}`,
      url: `/${numero}`,
      images: issue.portada.url,
    },
    twitter: {
      card: "summary_large_image",
      title: issue.titulo,
      description: `Nº ${numero} ${issue.fecha}`,
      images: issue.portada.url,
    },
  };
}
