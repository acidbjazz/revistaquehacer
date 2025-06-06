import styles from "@/styles/socialPage.module.scss";

import { getIssue, getData } from "@/lib/cms";
import { Article } from "@/lib/interfaces";

import ArticleRow from "@/components/social/row";

export const runtime = "edge";

export default async function SocialPage() {
  const data = await getData();
  const issueNumber = data.ultimoNumero.toString();
  const bvv = await fetch(new URL("/public/Baskervville-Italic.ttf", import.meta.url));
  const os = await fetch(new URL("/public/OpenSans-SemiBold.ttf", import.meta.url));
  const osl = await fetch(new URL("/public/OpenSans-Light.ttf", import.meta.url));
  const fonts = [
    {
      name: "Baskervville",
      data: await bvv.arrayBuffer(),
    },
    {
      name: "OpenSans",
      data: await os.arrayBuffer(),
    },
    {
      name: "OpenSansLight",
      data: await osl.arrayBuffer(),
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
