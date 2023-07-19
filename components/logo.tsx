"use client";

import styles from "@/styles/logo.module.scss";

import { useParams } from "next/navigation";
import Link from "next/link";
import SVG from "@/components/svg";

export default function Header() {
  const params = useParams();
  const issue = params.slug ? <div className={styles.issue}>{params.numero}</div> : null;
  return (
    <Link href={`/${params.slug ? params.numero : ""}`} className={styles.logo}>
      <SVG name="logoQ" width={34} />
      {issue}
    </Link>
  );
}
