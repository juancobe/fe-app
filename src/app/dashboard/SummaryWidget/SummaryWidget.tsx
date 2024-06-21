"use client"

// import { ServerInvoice, Transaction } from "@/src/types/types"
import TotalInAccount from "../TotalInAccount/TotalInAccount"
import { useContext, useMemo } from "react"
import styles from "./SummaryWidget.module.css"
import { DashboardContext } from "../page"

// interface SummaryWidgetProps {
//   transactions: Transaction[]
//   invoices: ServerInvoice[]
//   threshold: number
// }

/**
 * Shows total money in the account
 * Shows number of invoices in the past 30 days
 * @param param0
 * @returns
 */

const SummaryWidget = () => {
  // Calculate the total amount of money in the account
  const { transactions, invoices, threshold } = useContext(DashboardContext)

  const totalMoney = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      return acc + curr.amount
    }, 0)
  }, [transactions])

  const invoicesInLast30Days = useMemo(() => {
    return invoices.filter((invoice) => {
      const ms = Date.now() - new Date(invoice.creationDate).getTime()
      const days = Math.floor(ms / (24 * 60 * 60 * 1000))
      return days < 30
    })
  }, [invoices])

  return (
    <section className={styles.container}>
      <h2>Your Summary</h2>
      <TotalInAccount
        threshold={threshold}
        totalAmount={totalMoney}
      ></TotalInAccount>
      <p>Invoices in the last month: {invoicesInLast30Days.length}</p>
    </section>
  )
}

export default SummaryWidget
