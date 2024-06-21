"use client"

/**
 * Dashboard will have access to
 * transactions = Transaction[]
 * invoices = Invoice[]
 *
 * SummaryWidget - transactions and invoices
 * InvoicesWidget - invoices and transactions
 */

import transactionsData from "../../data/transactions.json"
import invoices from "../../data/invoices.json"
import SummaryWidget from "./SummaryWidget/SummaryWidget"
import { createContext, useCallback, useEffect, useState } from "react"
import { ClientInvoice, ServerInvoice, Transaction } from "@/src/types/types"
import InvoicesWidget from "./InvoicesWidget/InvoicesWidget"

// TODO: Add context to pass down to all children
// View when there's no data

const greenThreshold = 100

interface DashboardContextType {
  transactions: Transaction[]
  invoices: ClientInvoice[]
  threshold: number
  setServerInvoices: Dispatch<SetStateAction<ServerInvoice[]>>
}

const dashboardContextDefault = {
  transactions: [],
  invoices: [],
  threshold: greenThreshold,
  setServerInvoices: () => {},
}

export const DashboardContext = createContext<DashboardContextType>(
  dashboardContextDefault,
)

const Dashboard = () => {
  const [serverInvoices, setServerInvoices] = useState<ServerInvoice[]>([])
  const [displayInvoices, setDisplayInvoices] = useState<ClientInvoice[]>([])

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const hasInvoiceBeenPaid = useCallback(
    (invoice) => {
      return transactions.find(
        (t) =>
          t.reference === invoice.reference &&
          t.amount === invoice.amount &&
          new Date(t.creationDate).getTime() >
            new Date(invoice.creationDate).getTime(),
      )
    },
    [transactions],
  )

  useEffect(() => {
    setDisplayInvoices(
      serverInvoices.map((invoice) => {
        return {
          ...invoice,
          status: hasInvoiceBeenPaid(invoice) ? "PAID" : "NOT PAID",
        }
      }),
    )
  }, [hasInvoiceBeenPaid, serverInvoices])

  // simulate the API async fetch req
  useEffect(() => {
    setServerInvoices(invoices.invoices)
    setTransactions(transactionsData.transactions)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        transactions: transactions,
        invoices: displayInvoices,
        setServerInvoices,
        threshold: greenThreshold,
      }}
    >
      <div>
        <SummaryWidget
        //   transactions={transactions}
        //   invoices={serverInvoices}
        //   threshold={greenThreshold}
        ></SummaryWidget>
        <InvoicesWidget
        //   transactions={transactions}
        //   invoices={serverInvoices}
        ></InvoicesWidget>
      </div>
    </DashboardContext.Provider>
  )
}

export default Dashboard
