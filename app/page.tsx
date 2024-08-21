import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.helloWorld}>
        <h1>Hello World</h1>
        <p>Proto TTRPG dice roller coming soon.</p>
      </div>
      <div className={styles.progressMessages}>
        <h2 className={styles.heading}>Progress</h2>
        <ul>
          <li>Unit tests setup!</li>
        </ul>
      </div>
    </main>
  );
}
