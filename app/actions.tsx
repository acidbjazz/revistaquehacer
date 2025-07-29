"use server";

import satori from "satori";
import { Article } from "@/lib/interfaces";
import Portrait from "@/components/social/portrait";
import Square from "@/components/social/square";
import PortraitQuote from "@/components/social/portraitQuote";
import SquareQuote from "@/components/social/squareQuote";
import Instagram from "@/components/social/instagram";
import InstagramQuote from "@/components/social/instagramQuote";

async function loadGoogleFont(fontFamily: string, weight: string = "400"): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
    " ",
    "+"
  )}:wght@${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font: ${fontFamily}`);
}

export async function generateImagesForArticle(issue: string, article: Article) {
  console.log("issue:", issue);

  try {
    const [bvv, os, osl] = await Promise.all([
      loadGoogleFont("Baskervville", "400"),
      loadGoogleFont("Open Sans", "400"),
      loadGoogleFont("Open Sans", "300"),
    ]);

    const fonts = [
      { name: "Baskervville", data: bvv },
      { name: "OpenSans", data: os },
      { name: "OpenSansLight", data: osl },
    ];

    const optionsPortrait = { width: 1080, height: 1920, fonts };
    const optionsSquare = { width: 1080, height: 1080, fonts };
    const optionsInstagram = { width: 1080, height: 1350, fonts };

    const hasCopyText = article.copy && article.copy.trim() !== "";

    const basePromises = [
      satori(<Portrait issue={issue} article={article} />, optionsPortrait),
      satori(<Square issue={issue} article={article} />, optionsSquare),
      satori(<Instagram issue={issue} article={article} />, optionsInstagram),
    ];

    const allPromises = hasCopyText
      ? [
          ...basePromises,
          satori(<PortraitQuote issue={issue} article={article} />, optionsPortrait),
          satori(<SquareQuote issue={issue} article={article} />, optionsSquare),
          satori(<InstagramQuote issue={issue} article={article} />, optionsInstagram),
        ]
      : basePromises;

    const generatedSvgs = await Promise.all(allPromises);
    const [
      svgPortrait,
      svgSquare,
      svgInstagram,
      svgPortraitQuote,
      svgSquareQuote,
      svgInstagramQuote,
    ] = generatedSvgs;

    return {
      success: true,
      copyText: article.copy || "",
      link: `https://www.revistaquehacer.com/${issue}/${article.slug}`,
      svgs: {
        square: svgSquare,
        squareQuote: hasCopyText ? svgSquareQuote : undefined,
        instagram: svgInstagram,
        instagramQuote: hasCopyText ? svgInstagramQuote : undefined,
        portrait: svgPortrait,
        portraitQuote: hasCopyText ? svgPortraitQuote : undefined,
      },
      options: {
        squareHeight: optionsSquare.height,
        instagramHeight: optionsInstagram.height,
        portraitHeight: optionsPortrait.height,
      },
    };
  } catch (error) {
    console.error("Error generating images:", error);
    return { success: false, error: "Failed to generate images." };
  }
}
