import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

// Import mock data from the data folder!
import { dummyTransactions } from "../data/mockData";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  icon: string;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  categories: string[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  balance: number;
  monthlyBalance: number;
  loading: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

const DEFAULT_CATEGORIES = [
  "Food",
  "Shopping",
  "Entertainment",
  "Rent",
  "Salary",
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);

  // LOAD DATA & INJECT SARGAM'S DUMMY DATA IF EMPTY
  useEffect(() => {
    async function loadStoredData() {
      try {
        const savedTx = await AsyncStorage.getItem("@wallet_transactions");
        const savedCats = await AsyncStorage.getItem("@wallet_categories");

        // Check if we have saved transactions and if the array actually has items
        if (savedTx && JSON.parse(savedTx).length > 0) {
          setTransactions(JSON.parse(savedTx));
        } else {
          // If storage is empty, inject the dummy data!
          // We map over Sargam's array to inject a date for our charts
          const now = new Date();
          const seededData = dummyTransactions.map((tx, index) => {
            // We subtract a few days based on the index so the chart has variations
            const fakeDate = new Date(
              now.getTime() - index * 24 * 60 * 60 * 1000,
            );
            return {
              ...tx,
              date: fakeDate.toISOString(), // Attach the missing date property!
            };
          });

          setTransactions(seededData);
        }

        if (savedCats) {
          setCategories(JSON.parse(savedCats));
        }
      } catch (error) {
        console.log("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStoredData();
  }, []);

  // SAVE DATA
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(
        "@wallet_transactions",
        JSON.stringify(transactions),
      );
      AsyncStorage.setItem("@wallet_categories", JSON.stringify(categories));
    }
  }, [transactions, categories, loading]);

  const addTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addCategory = (newCat: string) => {
    const trimmed = newCat.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
  };

  const deleteCategory = (categoryToDelete: string) => {
    if (DEFAULT_CATEGORIES.includes(categoryToDelete)) {
      Alert.alert(
        "Action Denied",
        "Default system categories cannot be deleted.",
      );
      return;
    }

    setCategories((prev) => prev.filter((cat) => cat !== categoryToDelete));

    setTransactions((prev) =>
      prev.map((tx) =>
        tx.category === categoryToDelete ? { ...tx, category: "General" } : tx,
      ),
    );

    setCategories((prev) =>
      prev.includes("General") ? prev : [...prev, "General"],
    );
  };

  // THE MATH ENGINE
  const balance = transactions.reduce((acc, tx) => {
    return tx.type === "income" ? acc + tx.amount : acc - tx.amount;
  }, 0);

  const monthlyBalance = transactions.reduce((acc, tx) => {
    const txDate = new Date(tx.date);
    const now = new Date();

    if (
      txDate.getMonth() === now.getMonth() &&
      txDate.getFullYear() === now.getFullYear()
    ) {
      return tx.type === "income" ? acc + tx.amount : acc - tx.amount;
    }
    return acc;
  }, 0);

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <TransactionContext.Provider
      value={{
        transactions: sortedTransactions,
        categories,
        addTransaction,
        deleteTransaction,
        addCategory,
        deleteCategory,
        balance,
        monthlyBalance,
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
