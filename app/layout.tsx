import "@/styles/normalize.css";
import "@/styles/globals.scss";
import styles from "@/styles/rootLayout.module.scss";

import { Metadata } from "next";
import { sans, serif } from "@/lib/fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface RootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className={styles.layout}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: "%s | Revista Quehacer",
    default: "Revista Quehacer",
  },
  description:
    "Pensamiento crítico. Actualidad nacional e internacional. Opinión sobre política y cultura. Libros.",
  openGraph: {
    images: "/cover.jpg",
  },
};
