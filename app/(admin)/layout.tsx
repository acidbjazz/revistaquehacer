import "@/styles/normalize.css";
// import "@/styles/globals.scss";
import styles from "@/styles/adminLayout.module.scss";

// import { sans, serif } from "@/lib/fonts";
import Header from "@/components/header";

interface AdminLayout {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayout) {
  return (
    // <html lang="en" className={`${sans.variable} ${serif.variable}`}>
    <html lang="en">
      <body>
        <div className={styles.adminLayout}>
          {/* <Header /> */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
