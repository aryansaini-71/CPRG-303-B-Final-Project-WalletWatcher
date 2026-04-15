import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import { Colors } from "../../constants/Colors";
import { useTransactions } from "../../context/TransactionContext";

export default function SpendingScreen() {
  const { transactions } = useTransactions();

  // 1. CALCULATE BUDGET GOALS
  // This function finds all expenses for a specific category and adds them up
  const calculateCategoryTotal = (catName: string) => {
    return transactions
      .filter((t) => t.category === catName && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Define our limits and calculate the current spending dynamically
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

  // 2. WEEKLY BAR CHART LOGIC
  // We need to calculate how much was spent on each day over the last 7 days
  const dailyTotals = [0, 0, 0, 0, 0, 0, 0]; // Represents Sun(0) to Sat(6)
  const now = new Date();

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      // Fallback to today if an old transaction somehow doesn't have a date
      const txDate = new Date(tx.date || new Date().toISOString());

      // Calculate how many days ago this transaction happened
      const diffTime = Math.abs(now.getTime() - txDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // If it happened within the last 7 days, add its amount to the correct day
      if (diffDays <= 7) {
        const dayIndex = txDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
        dailyTotals[dayIndex] += tx.amount;
      }
    }
  });

  // Reorder our data so Monday is first in the chart (standard format)
  const weeklyData = [
    { day: "Mon", amount: dailyTotals[1] },
    { day: "Tue", amount: dailyTotals[2] },
    { day: "Wed", amount: dailyTotals[3] },
    { day: "Thu", amount: dailyTotals[4] },
    { day: "Fri", amount: dailyTotals[5] },
    { day: "Sat", amount: dailyTotals[6] },
    { day: "Sun", amount: dailyTotals[0] },
  ];

  // Find the highest spending day so we can scale the chart heights properly
  const maxAmount = Math.max(...dailyTotals, 1); // Use 1 to prevent dividing by zero

  // Calculate the total money spent this week for the top summary card
  const thisWeekTotal = weeklyData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Spending Analysis</Text>

        {/* 1. Summary Card (Now Dynamic) */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Spent This Week</Text>
          <Text style={styles.summaryAmount}>
            $
            {thisWeekTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Card>

        {/* 2. Bar Chart Card (Now Dynamic) */}
        <Card>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {weeklyData.map((item, index) => {
              // Calculate the bar height as a percentage of the max day (max height is 100px)
              const barHeight = (item.amount / maxAmount) * 100;

              return (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        // If there is no spending, give a tiny 5px height so the bar isn't invisible
                        height: barHeight > 0 ? barHeight : 5,
                        // Turn the bar dark green if it's the highest spending day
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

        {/* 3. Budget Goals Section (Now Dynamic) */}
        <Text style={styles.sectionTitle}>Budget Goals</Text>
        <Card>
          {budgets.map((budget, index) => {
            // Calculate percentage and cap it at 100% so the bar doesn't break out of the box
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
                        // Bar turns red if you go over budget!
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

// Keeping the styles exactly the same to preserve your UI layout
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
