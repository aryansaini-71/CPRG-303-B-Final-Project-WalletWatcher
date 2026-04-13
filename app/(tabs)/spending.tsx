import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import { Colors } from "../../constants/Colors";
import { useTransactions } from "../../context/TransactionContext";

export default function SpendingScreen() {
  const { transactions } = useTransactions();

  // 1. Logic: Calculate real totals for specific categories
  const calculateCategoryTotal = (catName: string) => {
    return transactions
      .filter((t) => t.category === catName && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // 2. Define Budgets
  const budgets = [
    {
      name: "Shopping",
      limit: 500,
      current: calculateCategoryTotal("Shopping"),
    },
    { name: "Food", limit: 400, current: calculateCategoryTotal("Food") },
    {
      name: "Entertainment",
      limit: 200,
      current: calculateCategoryTotal("Entertainment"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Spending Analysis</Text>

        {/* Weekly Bar Chart */}
        <Card>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {/* ... (Keep your weeklyData mapping here) */}
          </View>
        </Card>

        {/* 3. DYNAMIC BUDGET GOALS */}
        <Text style={styles.sectionTitle}>Budget Goals</Text>
        <Card>
          {budgets.map((budget, index) => {
            const percentage = Math.min(
              (budget.current / budget.limit) * 100,
              100,
            );
            const isOver = budget.current > budget.limit;

            return (
              <View key={index} style={{ marginBottom: 20 }}>
                <View style={styles.budgetRow}>
                  <Text style={styles.budgetName}>{budget.name}</Text>
                  <Text
                    style={[
                      styles.budgetPercent,
                      isOver && { color: Colors.light.iosRed },
                    ]}
                  >
                    ${budget.current.toFixed(0)} / ${budget.limit}
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
          })}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  container: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.textMain,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: Colors.light.walletPrimary,
    paddingVertical: 25,
    alignItems: "center",
  },
  summaryLabel: {
    color: "white",
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
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
    paddingHorizontal: 10,
  },
  barWrapper: { alignItems: "center", width: "12%" },
  barFill: { width: "100%", borderRadius: 6 },
  barLabel: {
    fontSize: 10,
    color: Colors.light.textSub,
    marginTop: 8,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.textMain,
    marginVertical: 15,
  },
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
});
