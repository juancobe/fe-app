export type Reference = string

export interface Transaction {
  creationDate: string
  description: string
  reference: Reference
  amount: number
}

export interface ServerInvoice {
  clientName: string
  creationDate: string
  reference: Reference
  amount: number
}

export interface ClientInvoice extends ServerInvoice {
  status?: "PAID" | "NOT PAID"
}
