import styles from "@/styles/nextArticle.module.scss";

import Link from "next/link";
import Image from "next/image";
import { formatAuthors } from "@/lib/utils";
import { Article } from "@/lib/interfaces";

interface NextArticle {
  article: Article;
  issue?: string;
}

export default function NextArticle({ article, issue }: NextArticle) {
  const href = issue ? `./${issue}/${article.slug}` : `./${article.slug}`;
  const text = issue ? "empieza aquí" : "siguiente artículo";
  return (
    <section className={styles.next}>
      <h2 className={styles.nextTitle}>{text}</h2>
      <div className={styles.type}>{article.section}</div>
      <Link href={href} className={styles.title}>
        <h1>{article.titulo}</h1>
      </Link>
      {article.subtitulo && <h2> {article.subtitulo} </h2>}
      <div className={styles.authors}>{formatAuthors(article.autorCollection.items)}</div>
      <Link href={href} className={styles.cover}>
        <Image src={article.portada.url} width={960} height={1080} alt={article.titulo} />
      </Link>
    </section>
  );
}
