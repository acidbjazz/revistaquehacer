"use client";

import styles from "@/styles/copyBox.module.scss";

import SVG from "./svg";

interface CopyBox {
  title: string;
  text: string;
}

export default async function CopyBox({ title, text }: CopyBox) {
  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(text);
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
    </div>
  );
}
