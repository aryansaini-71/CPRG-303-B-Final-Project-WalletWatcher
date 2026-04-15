import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { dummyTransactions } from "../data/mockData";

// 1. DATA MODELS
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  icon: string;
  date: string;
}

export interface Budget {
  category: string;
  limit: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  categories: string[];
  budgets: Budget[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updatedData: Transaction) => void; // NEW: Added Edit Function
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  updateBudget: (category: string, limit: number) => void;
  deleteBudget: (category: string) => void;
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

const DEFAULT_BUDGETS: Budget[] = [
  { category: "Shopping", limit: 500 },
  { category: "Food", limit: 400 },
  { category: "Entertainment", limit: 200 },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [budgets, setBudgets] = useState<Budget[]>(DEFAULT_BUDGETS);
  const [loading, setLoading] = useState(true);

  // LOAD DATA
  useEffect(() => {
    async function loadStoredData() {
      try {
        const savedTx = await AsyncStorage.getItem("@wallet_transactions");
        const savedCats = await AsyncStorage.getItem("@wallet_categories");
        const savedBudgets = await AsyncStorage.getItem("@wallet_budgets");

        if (savedTx && JSON.parse(savedTx).length > 0) {
          setTransactions(JSON.parse(savedTx));
        } else {
          const now = new Date();
          const seededData = dummyTransactions.map((tx, index) => {
            const fakeDate = new Date(
              now.getTime() - index * 24 * 60 * 60 * 1000,
            );
            return { ...tx, date: fakeDate.toISOString() };
          });
          setTransactions(seededData);
        }

        if (savedCats) setCategories(JSON.parse(savedCats));
        if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
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
      AsyncStorage.setItem("@wallet_budgets", JSON.stringify(budgets));
    }
  }, [transactions, categories, budgets, loading]);

  const addTransaction = (newTx: Transaction) =>
    setTransactions((prev) => [newTx, ...prev]);
  const deleteTransaction = (id: string) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  // The Edit Engine
  // This looks through all transactions, finds the one with the matching ID, and swaps it with the new data
  const updateTransaction = (id: string, updatedData: Transaction) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? updatedData : tx)),
    );
  };

  const addCategory = (newCat: string) => {
    const trimmed = newCat.trim();
    if (trimmed && !categories.includes(trimmed))
      setCategories((prev) => [...prev, trimmed]);
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
    deleteBudget(categoryToDelete);
  };

  const updateBudget = (category: string, limit: number) => {
    setBudgets((prev) => {
      const exists = prev.find((b) => b.category === category);
      if (exists)
        return prev.map((b) => (b.category === category ? { ...b, limit } : b));
      return [...prev, { category, limit }];
    });
  };

  const deleteBudget = (category: string) =>
    setBudgets((prev) => prev.filter((b) => b.category !== category));

  // MATH ENGINE
  const balance = transactions.reduce(
    (acc, tx) => (tx.type === "income" ? acc + tx.amount : acc - tx.amount),
    0,
  );
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
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions: sortedTransactions,
        categories,
        budgets,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        addCategory,
        deleteCategory,
        updateBudget,
        deleteBudget,
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
