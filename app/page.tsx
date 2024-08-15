import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.helloWorld}>
        <h1>Hello World</h1>
        <p>Proto TTRPG dice roller coming soon.</p>
      </div>
    </main>
  );
}
