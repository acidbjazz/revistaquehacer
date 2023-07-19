import styles from "@/styles/header.module.scss";

import Link from "next/link";
import Logo from "@/components/logo";

export default function Header() {
  return (
    <header className={styles.header}>
      {/* <Link href="/"> */}
      {/* <SVG name="logoQ" width={34} /> */}
      <Logo />
      {/* </Link> */}
    </header>
  );
}
