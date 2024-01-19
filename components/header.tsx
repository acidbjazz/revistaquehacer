import styles from "@/styles/header.module.scss";

import Logo from "@/components/logo";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}
