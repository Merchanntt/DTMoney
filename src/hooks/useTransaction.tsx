import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface TransactionsData {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
  createAt: string,
}

type TransactionInput = Omit<TransactionsData, 'id' | 'createAt'>

interface TransactionsContextData {
  transactions: TransactionsData[],
  createNewTransaction: (transaction: TransactionInput) => Promise<void>,
}

interface TransactionsProviderProps {
  children: ReactNode,
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
  )

export const TransactionsProvider = ({children}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionsData[]>([])

  useEffect(() => {
    api.get('/transactions').then(response => setTransactions(response.data.transactions))
  }, []);

  async function createNewTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createAt: new Date()
    })

    const {transaction} = response.data;

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{transactions, createNewTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction () {
  const context = useContext(TransactionsContext)

  return context
}