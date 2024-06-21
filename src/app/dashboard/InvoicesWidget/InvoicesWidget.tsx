import { ClientInvoice, ServerInvoice, Transaction } from "@/src/types/types"
import { useCallback, useEffect, useState } from "react"
import styles from "./InvoicesWidget.module.css"

interface InvoicesWidgetProps {
  transactions: Transaction[]
  invoices: ServerInvoice[]
}

/**
 * Show list of invoices, with each value modifiable and a way to add a new invoice
 * @returns
 */

//TODO: Amount field is showing only positive numbers
const InvoicesWidget = ({ transactions, invoices }: InvoicesWidgetProps) => {
  const [displayInvoices, setDisplayInvoices] =
    useState<ClientInvoice[]>(invoices)

  //  TODO: useCallback
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
      invoices.map((invoice) => {
        return {
          ...invoice,
          status: hasInvoiceBeenPaid(invoice) ? "PAID" : "NOT PAID",
        }
      }),
    )
  }, [hasInvoiceBeenPaid, invoices])

  useEffect(() => {
    console.log("changed display", displayInvoices)
  }, [displayInvoices])

  // per invoice, return a form -> invoice fields are the forms fields and then on submit we write into the correct index in display invoices

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const writeFieldIntoInvoice = useCallback(
    (invoiceIndex, field, value) => {
      const invoiceToEdit = displayInvoices[invoiceIndex]
      invoiceToEdit[field] = value

      // make copy of display invoices
      const allInvoices = JSON.parse(JSON.stringify(displayInvoices))

      allInvoices[invoiceIndex] = invoiceToEdit

      setDisplayInvoices(allInvoices)
    },
    [displayInvoices],
  )

  return (
    <>
      <h2>Your Invoices</h2>
      {displayInvoices.map((invoice, invoiceIndex) => {
        return (
          <>
            <form className={styles.form} key={invoice.reference} action="">
              {Object.keys(invoice).map((field: keyof ServerInvoice, index) => {
                return (
                  // TODO: convert into a reusable component, insert description
                  <div key={`${invoice.reference}-${field}`}>
                    <label
                      htmlFor={`${invoice.reference}-${field}`}
                      className={styles.label}
                    >
                      {field}:
                    </label>
                    <input
                      type="text"
                      id={`${invoice.reference}-${field}`}
                      value={invoice[field]}
                      onChange={(e) =>
                        writeFieldIntoInvoice(
                          invoiceIndex,
                          field,
                          e.target.value,
                        )
                      }
                    ></input>
                  </div>
                )
              })}

              <p>Has been paid: {invoice.status}</p>
            </form>
          </>
        )
      })}
    </>
  )
}
//   return <div>Invoices</div>

export default InvoicesWidget
