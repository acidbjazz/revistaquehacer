import styles from "@/styles/socialPage.module.scss";

import satori from "satori";
import Portrait from "@/components/social/portrait";
import Square from "@/components/social/square";
import SVGtoPNG from "@/components/social/svgtopng";
import PortraitQuote from "@/components/social/portraitQuote";
import SquareQuote from "@/components/social/squareQuote";
import CopyBox from "@/components/social/copyBox";

import { Article } from "@/lib/interfaces";

import Instagram from "@/components/social/instagram";
import InstagramQuote from "@/components/social/instagramQuote";

interface ArticleRow {
  issue: string;
  article: Article;
  fonts: any;
}

export default async function ArticleRow({ issue, article, fonts }: ArticleRow) {
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
  const optionsInstagram = {
    width: 1080,
    height: 1350,
    fonts,
  };
  //----
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
  const svgInstagramQuote = await satori(
    <InstagramQuote issue={issue} article={article} />,
    optionsInstagram
  );
  const svgInstagram = await satori(
    <Instagram issue={issue} article={article} />,
    optionsInstagram
  );

  //----
  return (
    <div className={styles.article}>
      <div className={styles.boxes}>
        <CopyBox title="copy" text={article.copy!} />
        <CopyBox title="link" text={`https://www.revistaquehacer.com/${issue}/${article.slug}`} />
      </div>
      <div className={styles.posts}>
        <SVGtoPNG svg={svgSquareQuote} height={optionsSquare.height} />
        <SVGtoPNG svg={svgSquare} height={optionsSquare.height} />
        <SVGtoPNG svg={svgInstagramQuote} height={optionsInstagram.height} />
        <SVGtoPNG svg={svgInstagram} height={optionsInstagram.height} />
        <SVGtoPNG svg={svgPortraitQuote} height={optionsPortrait.height} />
        <SVGtoPNG svg={svgPortrait} height={optionsPortrait.height} />
      </div>
      <hr />
    </div>
  );
}
