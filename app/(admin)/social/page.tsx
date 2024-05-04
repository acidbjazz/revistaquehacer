import styles from "@/styles/socialPage.module.scss";

import satori from "satori";
import { getIssue, getData } from "@/lib/cms";
import { Article } from "@/lib/interfaces";
import Portrait from "@/components/portrait";
import Square from "@/components/square";
import SVGtoPNG from "@/components/svgtopng";
import PortraitQuote from "@/components/portraitQuote";
import SquareQuote from "@/components/squareQuote";
import CopyBox from "@/components/copyBox";

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

interface ArticleRow {
  issue: string;
  article: Article;
  fonts: any;
}

async function ArticleRow({ issue, article, fonts }: ArticleRow) {
  const optionsPortrait = {
    width: 1080,
    height: 1920,
    fonts,
  };
  const optionsSquare = {
    width: 1080,
    height: 1080,
    fonts,
  };
  const svgPortraitQuote = await satori(
    <PortraitQuote issue={issue} article={article} />,
    optionsPortrait
  );
  const svgPortrait = await satori(<Portrait issue={issue} article={article} />, optionsPortrait);
  const svgSquareQuote = await satori(
    <SquareQuote issue={issue} article={article} />,
    optionsSquare
  );
  const svgSquare = await satori(<Square issue={issue} article={article} />, optionsSquare);
  return (
    <div className={styles.article}>
      {/* <div dangerouslySetInnerHTML={{ __html: svgPortraitQuote }} /> */}
      <div className={styles.boxes}>
        <CopyBox title="copy" text={article.copy!} />
        <CopyBox title="link" text={`https://www.revistaquehacer.com/${issue}/${article.slug}`} />
      </div>
      <SVGtoPNG svg={svgSquareQuote} height={optionsSquare.height} />
      <SVGtoPNG svg={svgSquare} height={optionsSquare.height} />
      <SVGtoPNG svg={svgPortraitQuote} height={optionsPortrait.height} />
      <SVGtoPNG svg={svgPortrait} height={optionsPortrait.height} />
    </div>
  );
}






// export const svgToPngURL = (svg: string) =>
//   new Promise<string>((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.naturalWidth;
//       canvas.height = img.naturalHeight;
//       const ctx = canvas.getContext("2d");
//       ctx!.drawImage(img, 0, 0);
//       resolve(canvas.toDataURL("image/png"));
//       URL.revokeObjectURL(img.src);
//     };
//     img.onerror = (e) => {
//       reject(e);
//       URL.revokeObjectURL(img.src);
//     };
//     img.src = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
//   });
