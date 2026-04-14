import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { dummyTransactions } from "../data/mockData";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  icon: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  balance: number;
  loading: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const savedData = await AsyncStorage.getItem("@wallet_transactions");

        if (savedData !== null) {
          const parsedData = JSON.parse(savedData);

          if (parsedData.length > 0) {
            setTransactions(parsedData);
          } else {
            setTransactions(dummyTransactions);
          }
        } else {
          setTransactions(dummyTransactions);
        }
      } catch (error) {
        console.log("Error loading data:", error);
        setTransactions(dummyTransactions);
      } finally {
        setLoading(false);
      }
    }

    loadStoredData();
  }, []);

  useEffect(() => {
    async function saveCurrentData() {
      try {
        await AsyncStorage.setItem(
          "@wallet_transactions",
          JSON.stringify(transactions),
        );
      } catch (error) {
        console.log("Error saving data:", error);
      }
    }

    if (!loading) {
      saveCurrentData();
    }
  }, [transactions, loading]);

  const addTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const balance = transactions.reduce((acc, tx) => {
    return tx.type === "income" ? acc + tx.amount : acc - tx.amount;
  }, 0);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        balance,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransactions must be within Provider");
  return context;
}