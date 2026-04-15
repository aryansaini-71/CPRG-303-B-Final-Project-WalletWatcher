import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/Card";
import { Colors } from "../../constants/Colors";
import { useTransactions } from "../../context/TransactionContext";

export default function SpendingScreen() {
  const { transactions, categories, budgets, updateBudget, deleteBudget } =
    useTransactions();

  // --- MODAL STATE ---
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [limitInput, setLimitInput] = useState("");

  // Automatically fill the input if they select a category that already has a budget
  useEffect(() => {
    const existingBudget = budgets.find((b) => b.category === selectedCategory);
    if (existingBudget) {
      setLimitInput(existingBudget.limit.toString());
    } else {
      setLimitInput("");
    }
  }, [selectedCategory, budgets]);

  const handleSaveBudget = () => {
    const limitNum = parseFloat(limitInput);
    if (isNaN(limitNum) || limitNum <= 0) {
      Alert.alert("Invalid Number", "Please enter a valid budget amount.");
      return;
    }
    updateBudget(selectedCategory, limitNum);
    setShowModal(false);
  };

  const handleDeleteBudget = () => {
    deleteBudget(selectedCategory);
    setShowModal(false);
  };

  // --- MATH ENGINE ---
  const calculateCategoryTotal = (catName: string) => {
    return transactions
      .filter((t) => t.category === catName && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const dailyTotals = [0, 0, 0, 0, 0, 0, 0];
  const now = new Date();

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const txDate = new Date(tx.date || new Date().toISOString());
      const diffTime = Math.abs(now.getTime() - txDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        const dayIndex = txDate.getDay();
        dailyTotals[dayIndex] += tx.amount;
      }
    }
  });

  const weeklyData = [
    { day: "Mon", amount: dailyTotals[1] },
    { day: "Tue", amount: dailyTotals[2] },
    { day: "Wed", amount: dailyTotals[3] },
    { day: "Thu", amount: dailyTotals[4] },
    { day: "Fri", amount: dailyTotals[5] },
    { day: "Sat", amount: dailyTotals[6] },
    { day: "Sun", amount: dailyTotals[0] },
  ];

  const maxAmount = Math.max(...dailyTotals, 1);
  const thisWeekTotal = weeklyData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Spending Analysis</Text>

        {/* Summary Card */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Spent This Week</Text>
          <Text style={styles.summaryAmount}>
            $
            {thisWeekTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Card>

        {/* Bar Chart Card */}
        <Card>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {weeklyData.map((item, index) => {
              const barHeight = (item.amount / maxAmount) * 100;
              return (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: barHeight > 0 ? barHeight : 5,
                        backgroundColor:
                          item.amount === maxAmount && item.amount > 0
                            ? Colors.light.walletPrimary
                            : Colors.light.walletMint,
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Budget Goals Section */}
        <View style={styles.budgetHeader}>
          <Text style={styles.sectionTitle}>Budget Goals</Text>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => setShowModal(true)}
          >
            <FontAwesome
              name="cog"
              size={16}
              color={Colors.light.walletPrimary}
            />
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>

        <Card>
          {budgets.length === 0 ? (
            <Text style={styles.emptyBudgetText}>
              No budget goals set. Click Manage to add one!
            </Text>
          ) : (
            budgets.map((budget, index) => {
              const currentSpent = calculateCategoryTotal(budget.category);
              const percentage = Math.min(
                (currentSpent / budget.limit) * 100,
                100,
              );
              const isOver = currentSpent > budget.limit;

              return (
                <View key={index} style={{ marginBottom: 20 }}>
                  <View style={styles.budgetRow}>
                    <Text style={styles.budgetName}>{budget.category}</Text>
                    <Text
                      style={[
                        styles.budgetPercent,
                        isOver && { color: Colors.light.iosRed },
                      ]}
                    >
                      ${currentSpent.toFixed(0)} / ${budget.limit}
                    </Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${percentage}%`,
                          backgroundColor: isOver
                            ? Colors.light.iosRed
                            : Colors.light.walletPrimary,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })
          )}
        </Card>
      </ScrollView>

      {/* --- MANAGE BUDGETS MODAL --- */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Budget Goal</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <FontAwesome name="times" size={24} color="#999" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>1. Select Category</Text>
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

            <Text style={styles.modalLabel}>2. Set Monthly Limit ($)</Text>
            <TextInput
              style={styles.limitInput}
              keyboardType="numeric"
              placeholder="e.g. 500"
              value={limitInput}
              onChangeText={setLimitInput}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteBudget}
              >
                <FontAwesome
                  name="trash"
                  size={20}
                  color={Colors.light.iosRed}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveBudget}
              >
                <Text style={styles.saveButtonText}>Save Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  container: { padding: 20, paddingBottom: 50 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.textMain,
    marginTop: 10,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: Colors.light.walletPrimary,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  summaryLabel: {
    color: "white",
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summaryAmount: { color: "white", fontSize: 32, fontWeight: "bold" },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.textMain,
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    paddingHorizontal: 5,
  },
  barWrapper: { alignItems: "center", width: "12%" },
  barFill: { width: "100%", borderRadius: 6 },
  barLabel: {
    fontSize: 10,
    color: Colors.light.textSub,
    marginTop: 8,
    fontWeight: "600",
  },

  // Budget Headers
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.textMain,
  },
  manageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.walletMint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  manageButtonText: {
    color: Colors.light.walletPrimary,
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 12,
  },
  emptyBudgetText: {
    color: Colors.light.textSub,
    textAlign: "center",
    marginVertical: 10,
    fontStyle: "italic",
  },

  // Progress bars
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  budgetName: { fontSize: 14, fontWeight: "600", color: Colors.light.textMain },
  budgetPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.textSub,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F2F2F7",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: { height: "100%", borderRadius: 4 },

  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.textMain,
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.light.textSub,
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  // Category Scroll
  categoryScroll: { marginBottom: 25, maxHeight: 45 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    marginRight: 10,
  },
  activeChip: { backgroundColor: Colors.light.walletPrimary },
  chipText: { fontSize: 14, fontWeight: "600", color: Colors.light.textSub },
  activeChipText: { color: "#FFF" },

  // Input & Buttons
  limitInput: {
    backgroundColor: "#F9F9FB",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 15,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  modalButtons: { flexDirection: "row", alignItems: "center" },
  deleteButton: {
    backgroundColor: "#FFE5E5",
    padding: 18,
    borderRadius: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.light.walletDark,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  saveButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
