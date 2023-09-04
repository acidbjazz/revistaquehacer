import "@/styles/normalize.css";
import "@/styles/globals.scss";
import styles from "@/styles/rootLayout.module.scss";

import Script from "next/script";
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-E4LDTBPJTL" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E4LDTBPJTL');
        `}
      </Script>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://revistaquehacer.pe"),
  title: {
    template: "%s | Revista Quehacer",
    default: "Revista Quehacer",
  },
  description:
    "Pensamiento crítico. Actualidad nacional e internacional. Opinión sobre política y cultura. Libros.",
  openGraph: {
    type: "website",
    title: {
      template: "%s | Revista Quehacer",
      default: "Revista Quehacer",
    },
    description:
      "Pensamiento crítico. Actualidad nacional e internacional. Opinión sobre política y cultura. Libros.",
    images: "/cover.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | Revista Quehacer",
      default: "Revista Quehacer",
    },
    description:
      "Pensamiento crítico. Actualidad nacional e internacional. Opinión sobre política y cultura. Libros.",
    images: "/cover.jpg",
  },
};
