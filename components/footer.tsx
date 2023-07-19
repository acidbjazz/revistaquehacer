import styles from "@/styles/footer.module.scss";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import SVG from "@/components/svg";
import { getData } from "@/lib/cms";

export default async function Footer() {
  const year = new Date().getFullYear();
  const data = await getData();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <SVG name="logoQD" width={200} />
        <ReactMarkdown className={styles.data}>{data.pie}</ReactMarkdown>
        <div className={styles.copy}>© {year} Revista Quehacer.</div>
      </div>
    </footer>
  );
}
