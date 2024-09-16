import Image from "next/image";
import styles from "./page.module.css";
import { DiceRoller } from "@/components/dice-roller";
import { Proto } from "@/components/proto";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>
        <Proto />
      </h1>
      <DiceRoller />
    </main>
  );
}
