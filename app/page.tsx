import styles from "@/styles/homePage.module.scss";

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getIssues, getData } from "@/lib/cms";

export default async function HomePage() {
  const data = await getData();
  const issues = await getIssues();
  const lastIssue = issues[0];
  const previousIssues = issues.slice(1);
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.issn}>ISSN {data.issn}</div>
        <h1>
          <ReactMarkdown>{data.etapaDigital}</ReactMarkdown>
        </h1>
      </section>
      <section className={styles.lastIssue}>
        <h2>ÚLTIMO NÚMERO</h2>
        <Link href={`./${lastIssue.numero}`} className={styles.cover}>
          <Image
            src={lastIssue.portada.url}
            alt="cover"
            width={1920}
            height={1080}
            priority={true}
          />
        </Link>
        <div className={styles.date}>
          Nº {lastIssue.numero} {lastIssue.fecha}
        </div>
        <Link href={`./${lastIssue.numero}`} className={styles.title}>
          <h3>{lastIssue.titulo}</h3>
        </Link>
        {lastIssue.sumilla && (
          <ReactMarkdown className={styles.abstract}>{lastIssue.sumilla}</ReactMarkdown>
        )}
      </section>
      <section className={styles.previousIssues}>
        <h2>NÚMEROS ANTERIORES</h2>
        <div className={styles.grid}>
          {previousIssues.map((item) => (
            <Link href={`/${item.numero}`} key={item.numero} className={styles.card}>
              <div>
                <Image src={item.portada.url} alt="cover" width={1920} height={1080} sizes="25vw" />
                <div className={styles.date}>
                  Nº {item.numero} {item.fecha}
                </div>
                <h3>{item.titulo}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
