import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router"; // useLocalSearchParams grabs the ID
import React, { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "../constants/Colors";
import { useTransactions } from "../context/TransactionContext";

export default function EditTransactionScreen() {
  const router = useRouter();
  // Grab the ID we passed from the TransactionItem click
  const { id } = useLocalSearchParams();

  const { transactions, updateTransaction, categories, addCategory } =
    useTransactions();

  // 1. Find the exact transaction we are editing
  const existingTx = transactions.find((t) => t.id === id);

  // 2. Pre-fill all the state variables with the old data!
  const [amount, setAmount] = useState(
    existingTx ? existingTx.amount.toString() : "",
  );
  const [title, setTitle] = useState(existingTx ? existingTx.title : "");
  const [type, setType] = useState<"expense" | "income">(
    existingTx ? existingTx.type : "expense",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    existingTx ? existingTx.category : "General",
  );
  const [customCategory, setCustomCategory] = useState("");

  // Pre-fill the date (Parse the string back into a real Date object)
  const [date, setDate] = useState(
    existingTx ? new Date(existingTx.date) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Failsafe: If the transaction was somehow deleted while we were opening this screen
  useEffect(() => {
    if (!existingTx) {
      Alert.alert("Error", "Transaction not found.");
      router.back();
    }
  }, [existingTx]);

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      addCategory(customCategory);
      setSelectedCategory(customCategory.trim());
      setCustomCategory("");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  // Save the changes
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Missing Info", "Please enter a title for this transaction.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }

    // Assign an icon just like we do when creating one
    let icon = type === "expense" ? "💸" : "💵";
    if (selectedCategory === "Food") icon = "🍔";
    if (selectedCategory === "Shopping") icon = "🛒";
    if (selectedCategory === "Entertainment") icon = "🎬";
    if (selectedCategory === "Rent") icon = "🏠";

    // Call the UPDATE function instead of the ADD function!
    updateTransaction(id as string, {
      id: id as string, // Keep the same ID
      title: title.trim(),
      amount: parsedAmount,
      type: type,
      category: selectedCategory,
      icon: icon,
      date: date.toISOString(), // Keep the new date
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Transaction</Text>
            <View style={{ width: 24 }} /> {/* Spacer for centering */}
          </View>

          {/* Amount Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Type Toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggle, type === "expense" && styles.activeToggle]}
              onPress={() => setType("expense")}
            >
              <Text
                style={
                  type === "expense"
                    ? { color: Colors.light.walletPrimary, fontWeight: "bold" }
                    : {}
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
                  type === "income"
                    ? { color: Colors.light.walletPrimary, fontWeight: "bold" }
                    : {}
                }
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <Text style={styles.sectionLabel}>Transaction Details</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="What was this for? (e.g. Coffee)"
            value={title}
            onChangeText={setTitle}
          />

          {/* Date Picker */}
          <Text style={styles.sectionLabel}>Date</Text>
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onChangeDate}
              />
            )}
          </View>

          {/* Category Selection */}
          <Text style={styles.sectionLabel}>Update Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  selectedCategory === cat && styles.activeChip,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === cat && styles.activeChipText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { padding: 25 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  close: { fontSize: 24 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.textMain,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  currency: {
    fontSize: 40,
    color: Colors.light.walletPrimary,
    fontWeight: "bold",
  },
  amountInput: {
    fontSize: 60,
    fontWeight: "bold",
    color: Colors.light.textMain,
  },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7",
    borderRadius: 15,
    padding: 5,
    marginBottom: 30,
  },
  toggle: { flex: 1, padding: 12, alignItems: "center", borderRadius: 10 },
  activeToggle: {
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.textSub,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  titleInput: {
    backgroundColor: "#F9F9FB",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 25,
    color: Colors.light.textMain,
  },
  dateRow: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  dateButton: {
    backgroundColor: "#F9F9FB",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    alignItems: "flex-start",
  },
  dateText: { fontSize: 16, color: Colors.light.textMain, fontWeight: "500" },
  categoryScroll: { marginBottom: 30, maxHeight: 50 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  activeChip: { backgroundColor: Colors.light.walletPrimary },
  chipText: { fontSize: 14, fontWeight: "600", color: Colors.light.textSub },
  activeChipText: { color: "#FFF" },
  saveBtn: {
    backgroundColor: Colors.light.walletDark,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  saveText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
