import { Transaction } from "../context/TransactionContext";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  date: string;
  read: boolean;
}

export const dummyTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 3000,
    type: "income",
    category: "Salary",
    icon: "💰",
    date: "",
  },
  {
    id: "2",
    title: "Shopping",
    amount: 200,
    type: "expense",
    category: "Shopping",
    icon: "🛍️",
    date: "",
  },
  {
    id: "3",
    title: "Groceries",
    amount: 150,
    type: "expense",
    category: "Food",
    icon: "🛒",
    date: "",
  },
  {
    id: "4",
    title: "Movie Night",
    amount: 40,
    type: "expense",
    category: "Entertainment",
    icon: "🎬",
    date: "",
  },
  {
    id: "5",
    title: "Freelance",
    amount: 500,
    type: "income",
    category: "Salary",
    icon: "💻",
    date: "",
  },
  {
    id: "6",
    title: "Coffee",
    amount: 8,
    type: "expense",
    category: "Food",
    icon: "☕",
    date: "",
  },
  {
    id: "7",
    title: "Online Shopping",
    amount: 95,
    type: "expense",
    category: "Shopping",
    icon: "📦",
    date: "",
  },
  {
    id: "8",
    title: "Music Subscription",
    amount: 12,
    type: "expense",
    category: "Entertainment",
    icon: "🎵",
    date: "",
  },
];

export const dummyNotifications: AppNotification[] = [
  {
    id: "1",
    title: "Budget Alert",
    message: "You are close to your monthly budget limit.",
    type: "warning",
    date: "2026-04-10",
    read: false,
  },
  {
    id: "2",
    title: "Income Added",
    message: "Your salary was added successfully.",
    type: "success",
    date: "2026-04-01",
    read: true,
  },
  {
    id: "3",
    title: "Food Spending",
    message: "Your food spending increased this week.",
    type: "info",
    date: "2026-04-11",
    read: false,
  },
  {
    id: "4",
    title: "Transaction Added",
    message: "A new shopping transaction was recorded.",
    type: "success",
    date: "2026-04-12",
    read: true,
  },
  {
    id: "5",
    title: "Weekly Summary",
    message: "Your weekly spending summary is ready.",
    type: "info",
    date: "2026-04-13",
    read: false,
  },
];
