"use client";

import { useState } from "react";
import styles from "@/styles/copyBox.module.scss";
import SVG from "@/components/svg";

interface CopyBox {
  title: string;
  text: string;
}

export default function CopyBox({ title, text }: CopyBox) {
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // El mensaje desaparece después de 2 segundos
  };

  return (
    <div className={styles.copyBox}>
      <header>
        <h3>{title}</h3>
        <button onClick={copyToClipBoard}>
          <SVG name="copy" />
        </button>
      </header>
      <p>{text}</p>
      {copied && <span className={styles.copiedMessage}>¡Copiado!</span>}
    </div>
  );
}
