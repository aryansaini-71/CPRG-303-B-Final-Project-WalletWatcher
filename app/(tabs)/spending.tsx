import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import { Colors } from "../../constants/Colors";

export default function SpendingScreen() {
  // Mock data for the bar chart
  const weeklyData = [
    { day: "Mon", height: 40 },
    { day: "Tue", height: 70 },
    { day: "Wed", height: 50 },
    { day: "Thu", height: 90 },
    { day: "Fri", height: 60 },
    { day: "Sat", height: 30 },
    { day: "Sun", height: 45 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Spending Analysis</Text>

        {/* 1. Summary Card */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>This Week</Text>
          <Text style={styles.summaryAmount}>$420.65</Text>
        </Card>

        {/* 2. Bar Chart Card */}
        <Card>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {weeklyData.map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: item.height,
                      backgroundColor:
                        item.height > 80
                          ? Colors.light.walletPrimary
                          : Colors.light.walletMint,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* 3. Budget Goals Section */}
        <Text style={styles.sectionTitle}>Budget Goals</Text>
        <Card>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetName}>Entertainment</Text>
            <Text style={styles.budgetPercent}>85%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: "85%", backgroundColor: Colors.light.iosRed },
              ]}
            />
          </View>

          <View style={[styles.budgetRow, { marginTop: 20 }]}>
            <Text style={styles.budgetName}>Groceries</Text>
            <Text style={styles.budgetPercent}>40%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: "40%", backgroundColor: Colors.light.walletPrimary },
              ]}
            />
          </View>
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
