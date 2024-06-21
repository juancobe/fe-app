"use client"

/**
 * Dashboard will have access to
 * transactions = Transaction[]
 * invoices = Invoice[]
 *
 * SummaryWidget - transactions and invoices
 * InvoicesWidget - invoices and transactions
 */

import transactions from "../../data/transactions.json"
import invoices from "../../data/invoices.json"
import SummaryWidget from "./SummaryWidget/SummaryWidget"
import { useEffect, useState } from "react"
import { ServerInvoice, Transaction } from "@/src/types/types"
import InvoicesWidget from "./InvoicesWidget/InvoicesWidget"

// TODO: Add context to pass down to all children
// View when there's no data

const greenThreshold = 100

const Dashboard = () => {
  console.log("invoices", invoices)
  console.log("transactions", transactions)

  const [serverInvoices, setServerInvoices] = useState<ServerInvoice[]>([])
  const [serverTransactions, setServerTransactions] = useState<Transaction[]>(
    [],
  )

  // simulate the API async fetch req
  useEffect(() => {
    setServerInvoices(invoices.invoices)
    setServerTransactions(transactions.transactions)
  }, [])

  return (
    <div>
      <SummaryWidget
        transactions={serverTransactions}
        invoices={serverInvoices}
        threshold={greenThreshold}
      ></SummaryWidget>
      <InvoicesWidget
        transactions={serverTransactions}
        invoices={serverInvoices}
      ></InvoicesWidget>
    </div>
  )
}

export default Dashboard
