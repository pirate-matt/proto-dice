import Image from "next/image";
import styles from "./page.module.css";
import { DiceRoller } from "@/components/dice-roller";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.helloWorld}>
        <h1>Hello World</h1>
        <p>Proto TTRPG dice roller coming soon.</p>
      </div>
      <div className={styles.progressMessages}>
        <h2 className={styles.styled}>Progress</h2>
        <ul>
          <li>Unit tests setup!</li>
        </ul>
      </div>
      <div>
        <h2 className={styles.styled}>Dice Roller</h2>
        <DiceRoller />
      </div>
    </main>
  );
}
