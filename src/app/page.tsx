import Image from "next/image";
import styles from "./page.module.css";
import api from "@/api";

export default async function Home() {
  const users = await api.apiFetch('/')

  return (
    <main className={styles.main}>
      {users.message}
    </main>
  );
}
