import styles from "./page.module.css"
import api from "@/api"

export default async function Home() {
  const data = await api.apiFetch("/")

  return <main className={styles.main}>{data.message}</main>
}
