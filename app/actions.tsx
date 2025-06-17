"use server";

import { promises as fs } from "fs";
import path from "path";
import satori from "satori";
import { Article } from "@/lib/interfaces";

// ... (tus imports de plantillas de imagen no cambian)
import Portrait from "@/components/social/portrait";
import Square from "@/components/social/square";
import PortraitQuote from "@/components/social/portraitQuote";
import SquareQuote from "@/components/social/squareQuote";
import Instagram from "@/components/social/instagram";
import InstagramQuote from "@/components/social/instagramQuote";

async function loadFont(fontFileName: string) {
  const fontPath = path.join(process.cwd(), "public", fontFileName);
  return fs.readFile(fontPath);
}

export async function generateImagesForArticle(issue: string, article: Article) {
  try {
    const [bvv, os, osl] = await Promise.all([
      loadFont("Baskervville-Italic.ttf"),
      loadFont("OpenSans-SemiBold.ttf"),
      loadFont("OpenSans-Light.ttf"),
    ]);
    const fonts = [
      { name: "Baskervville", data: bvv },
      { name: "OpenSans", data: os },
      { name: "OpenSansLight", data: osl },
    ];

    const optionsPortrait = { width: 1080, height: 1920, fonts };
    const optionsSquare = { width: 1080, height: 1080, fonts };
    const optionsInstagram = { width: 1080, height: 1350, fonts };

    // ✅ **LÓGICA CONDICIONAL**
    // Revisa si el campo 'copy' tiene texto.
    const hasCopyText = article.copy && article.copy.trim() !== "";

    // Prepara las promesas de Satori
    const satoriPromises = [
      satori(<Portrait issue={issue} article={article} />, optionsPortrait),
      satori(<Square issue={issue} article={article} />, optionsSquare),
      satori(<Instagram issue={issue} article={article} />, optionsInstagram),
    ];

    // Si hay texto en 'copy', añade las promesas para las imágenes "Quote"
    if (hasCopyText) {
      satoriPromises.push(
        satori(<PortraitQuote issue={issue} article={article} />, optionsPortrait),
        satori(<SquareQuote issue={issue} article={article} />, optionsSquare),
        satori(<InstagramQuote issue={issue} article={article} />, optionsInstagram)
      );
    }

    // Ejecuta todas las promesas necesarias
    const generatedSvgs = await Promise.all(satoriPromises);

    // Asigna los resultados
    const [svgPortrait, svgSquare, svgInstagram] = generatedSvgs;
    let svgPortraitQuote, svgSquareQuote, svgInstagramQuote;

    if (hasCopyText) {
      svgPortraitQuote = generatedSvgs[3];
      svgSquareQuote = generatedSvgs[4];
      svgInstagramQuote = generatedSvgs[5];
    }

    return {
      success: true,
      copyText: article.copy!,
      link: `https://www.revistaquehacer.com/${issue}/${article.slug}`,
      svgs: {
        squareQuote: svgSquareQuote, // Será undefined si no hay copy
        square: svgSquare,
        instagramQuote: svgInstagramQuote, // Será undefined si no hay copy
        instagram: svgInstagram,
        portraitQuote: svgPortraitQuote, // Será undefined si no hay copy
        portrait: svgPortrait,
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
