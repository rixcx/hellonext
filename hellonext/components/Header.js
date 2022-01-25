import Link from "next/link";
import styles from '../styles/header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">
          <a>
            Blog title
          </a>
        </Link>
      </h1>
    </header>
  )
}