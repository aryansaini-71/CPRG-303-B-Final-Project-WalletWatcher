import DateTimePicker from "@react-native-community/datetimepicker"; // NEW: Native Date Picker
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction, categories, addCategory, deleteCategory } =
    useTransactions();

  // --- STATE MANAGEMENT ---
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState("");

  // NEW: Date state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- LOGIC FUNCTIONS ---

  // Handle adding a custom category
  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      addCategory(customCategory);
      setSelectedCategory(customCategory.trim());
      setCustomCategory("");
    }
  };

  // Handle long press to delete a category
  const handleLongPressCategory = (cat: string) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${cat}"? Any transactions using this will be reassigned to "General".`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteCategory(cat);
            if (selectedCategory === cat) setSelectedCategory("General");
          },
        },
      ],
    );
  };

  // NEW: Handle the Date Picker selection
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // iOS keeps it open, Android closes it automatically
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // NEW: Bulletproof Validation & Save Logic
  const handleSave = () => {
    // 1. Validate Title (Don't allow empty spaces)
    if (!title.trim()) {
      Alert.alert("Missing Info", "Please enter a title for this transaction.");
      return;
    }

    // 2. Validate Math (Ensure it's a real, positive number)
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }

    // 3. Assign an Icon based on category or type
    let icon = type === "expense" ? "💸" : "💵";
    if (selectedCategory === "Food") icon = "🍔";
    if (selectedCategory === "Shopping") icon = "🛒";
    if (selectedCategory === "Entertainment") icon = "🎬";
    if (selectedCategory === "Rent") icon = "🏠";

    // 4. Save to our Global Engine!
    addTransaction({
      id: Math.random().toString(), // Simple ID generation
      title: title.trim(),
      amount: parsedAmount,
      type: type,
      category: selectedCategory,
      icon: icon,
      date: date.toISOString(), // Convert the Date object to a string for storage
    });

    // 5. Go back to the dashboard
    router.back();
  };

  // --- UI RENDERING ---
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
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>

          {/* Amount Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
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

          {/* NEW: Date Picker UI */}
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
                maximumDate={new Date()} // Don't allow future dates
                onChange={onChangeDate}
              />
            )}
          </View>

          {/* Category Selection Section */}
          <Text style={styles.sectionLabel}>
            Select Category (Long press to delete)
          </Text>
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
                onLongPress={() => handleLongPressCategory(cat)}
                activeOpacity={0.7}
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

          {/* Add Custom Category Input */}
          <View style={styles.addCategoryRow}>
            <TextInput
              style={styles.customCategoryInput}
              placeholder="Add custom category..."
              value={customCategory}
              onChangeText={setCustomCategory}
            />
            <TouchableOpacity
              style={styles.addCategoryBtn}
              onPress={handleAddCustomCategory}
            >
              <Text style={styles.addCategoryBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Confirm Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles perfectly matched to your Figma theme
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { padding: 25 },
  close: { fontSize: 24, marginBottom: 10 },
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

  // Date Picker styles
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

  // Category Styles
  categoryScroll: { marginBottom: 15, maxHeight: 50 },
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
  addCategoryRow: {
    flexDirection: "row",
    marginBottom: 40,
    alignItems: "center",
  },
  customCategoryInput: {
    flex: 1,
    backgroundColor: "#F9F9FB",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    fontSize: 14,
  },
  addCategoryBtn: {
    backgroundColor: Colors.light.walletMint,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addCategoryBtnText: { color: Colors.light.walletDark, fontWeight: "bold" },

  saveBtn: {
    backgroundColor: Colors.light.walletDark,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  saveText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
