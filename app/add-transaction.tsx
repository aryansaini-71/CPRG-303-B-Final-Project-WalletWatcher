import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useTransactions } from "../context/TransactionContext";

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");

  const handleSave = () => {
    if (!amount || !title) return;
    addTransaction({
      id: Math.random().toString(),
      title,
      amount: parseFloat(amount),
      type,
      category: type === "expense" ? "Shopping" : "Salary",
      icon: type === "expense" ? "💸" : "💵",
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.currency}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            keyboardType="numeric"
            onChangeText={setAmount}
            autoFocus
          />
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggle, type === "expense" && styles.activeToggle]}
            onPress={() => setType("expense")}
          >
            <Text
              style={
                type === "expense" ? { color: Colors.light.walletPrimary } : {}
              }
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggle, type === "income" && styles.activeToggle]}
            onPress={() => setType("income")}
          >
            <Text
              style={
                type === "income" ? { color: Colors.light.walletPrimary } : {}
              }
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.titleInput}
          placeholder="What was this for?"
          onChangeText={setTitle}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Confirm Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { padding: 25 },
  close: { fontSize: 24, marginBottom: 20 },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  currency: {
    fontSize: 40,
    color: Colors.light.walletPrimary,
    fontWeight: "bold",
  },
  amountInput: { fontSize: 60, fontWeight: "bold" },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7",
    borderRadius: 15,
    padding: 5,
    marginBottom: 30,
  },
  toggle: { flex: 1, padding: 12, alignItems: "center", borderRadius: 10 },
  activeToggle: { backgroundColor: "#FFF" },
  titleInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 15,
    fontSize: 18,
    marginBottom: 40,
  },
  saveBtn: {
    backgroundColor: Colors.light.walletDark,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  saveText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
