import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

  // Load data from the phone's memory when the app starts
  useEffect(() => {
    async function loadStoredData() {
      try {
        const savedData = await AsyncStorage.getItem("@wallet_transactions");
        if (savedData !== null) {
          setTransactions(JSON.parse(savedData));
        }
      } catch (error) {
        console.log("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStoredData();
  }, []);

  // Save data to the phone's memory every time the transactions list changes
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
