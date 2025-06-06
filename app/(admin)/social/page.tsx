import styles from "@/styles/socialPage.module.scss";

import { getIssue, getData } from "@/lib/cms";
import { Article } from "@/lib/interfaces";

import ArticleRow from "@/components/social/row";

import { readFileSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export default async function SocialPage() {
  const data = await getData();
  const issueNumber = data.ultimoNumero.toString();
  const fonts = [
    {
      name: "Baskervville",
      data: readFileSync(path.join(process.cwd(), "public/Baskervville-Italic.ttf")),
    },
    {
      name: "OpenSans",
      data: readFileSync(path.join(process.cwd(), "public/OpenSans-SemiBold.ttf")),
    },
    {
      name: "OpenSansLight",
      data: readFileSync(path.join(process.cwd(), "public/OpenSans-Light.ttf")),
    },
  ];

  const issue = await getIssue(issueNumber);
  const contents = issue.indiceCollection.items;

  return (
    <section className={styles.articles}>
      {contents.map((item) => {
        if (item.__typename === "Articulo") {
          const itemArticle = item as Article;
          return (
            <ArticleRow issue={issueNumber} fonts={fonts} article={itemArticle} key={item.sys.id} />
          );
        }
      })}
    </section>
  );
}
