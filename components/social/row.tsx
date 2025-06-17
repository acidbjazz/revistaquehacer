"use client";

import { useState } from "react";
import styles from "@/styles/socialPage.module.scss";
import { Article } from "@/lib/interfaces";
import { generateImagesForArticle } from "@/app/actions";

import SVGtoPNG from "@/components/social/svgtopng";
import CopyBox from "@/components/social/copyBox";

interface ArticleRowProps {
  issue: string;
  article: Article;
}

type GenerationResult = Awaited<ReturnType<typeof generateImagesForArticle>>;

export default function ArticleRow({ issue, article }: ArticleRowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setError(null);
    const response = await generateImagesForArticle(issue, article);
    if (response.success) {
      setResult(response);
    } else {
      setError(response.error || "Ocurrió un error desconocido.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.article}>
      <h4>{article.titulo}</h4>
      <div className={styles.boxes}>
        <CopyBox title="copy" text={article.copy!} />
        <CopyBox title="link" text={`https://www.revistaquehacer.com/${issue}/${article.slug}`} />
      </div>
      <button onClick={handleGenerateClick} disabled={isLoading}>
        {isLoading ? "Generando..." : "Generar Imágenes"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {result && result.success && (
        <div className={styles.posts}>
          {/* ✅ **CAMBIO 2: Renderizado condicional para las imágenes "Quote"** */}
          {result.svgs?.squareQuote && (
            <SVGtoPNG svg={result.svgs.squareQuote} height={result.options.squareHeight} />
          )}
          <SVGtoPNG svg={result.svgs?.square} height={result.options?.squareHeight} />

          {result.svgs?.instagramQuote && (
            <SVGtoPNG svg={result.svgs?.instagramQuote} height={result.options?.instagramHeight} />
          )}
          <SVGtoPNG svg={result.svgs?.instagram} height={result.options?.instagramHeight} />

          {result.svgs?.portraitQuote && (
            <SVGtoPNG svg={result.svgs?.portraitQuote} height={result.options?.portraitHeight} />
          )}
          <SVGtoPNG svg={result.svgs?.portrait} height={result.options?.portraitHeight} />
        </div>
      )}
      <hr />
    </div>
  );
}
