"use client";

import { useRef, useEffect } from "react";

export default function SVGtoPNG({ svg, height }: any) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = height;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      imgRef.current!.src = canvas.toDataURL("image/png");
      URL.revokeObjectURL(image.src);
    };
    image.src = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  }, []);

  return <img ref={imgRef} />;
}
