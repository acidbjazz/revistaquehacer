import styles from "@/styles/notFound.module.scss";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className={styles.notFound}>
        <h1>404: Página No Encontrada</h1>
        <Link href="/">Continúa aquí para ir al inicio</Link>
      </section>
    </>
  );
}
