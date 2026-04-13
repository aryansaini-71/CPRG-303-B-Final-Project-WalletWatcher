import { Link } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/Card";
import TransactionItem from "../../components/TransactionItem";
import { Colors } from "../../constants/Colors";
import { useTransactions } from "../../context/TransactionContext";

const CATEGORIES = ["All", "Shopping", "Salary", "Food", "Entertainment"];

export default function OverviewScreen() {
  const { transactions, balance } = useTransactions();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Logic: Filter transactions based on Search and Category
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Aryan Saini</Text>
          </View>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>AS</Text>
          </View>
        </View>

        {/* Balance Card */}
        <Card style={styles.darkCard}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceAmount}>
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
        </Card>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search transactions..."
            placeholderTextColor={Colors.light.textSub}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Category Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveTab(cat)}
              style={[styles.chip, activeTab === cat && styles.activeChip]}
            >
              <Text
                style={[
                  styles.chipText,
                  activeTab === cat && styles.activeChipText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        {/* Filtered Transaction List */}
        <Card>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <TransactionItem
                key={item.id}
                title={item.title}
                category={item.category}
                amount={`$${item.amount.toFixed(2)}`}
                icon={item.icon}
                isExpense={item.type === "expense"}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No transactions found.</Text>
          )}
        </Card>
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <Link href="/add-transaction" asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  container: { padding: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  welcomeText: { fontSize: 14, color: Colors.light.textSub },
  nameText: { fontSize: 22, fontWeight: "bold", color: Colors.light.textMain },
  profileCircle: {
    width: 45,
    height: 45,
    backgroundColor: Colors.light.walletMint,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: { fontWeight: "bold", color: Colors.light.walletDark },
  darkCard: {
    backgroundColor: Colors.light.walletDark,
    alignItems: "center",
    paddingVertical: 35,
  },
  balanceLabel: {
    color: Colors.light.walletMint,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  balanceAmount: { color: "#FFF", fontSize: 36, fontWeight: "bold" },
  searchContainer: { marginVertical: 15 },
  searchBar: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 15,
    fontSize: 16,
    color: Colors.light.textMain,
    elevation: 2,
  },
  filterScroll: { marginBottom: 20 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#EBEBEB",
    borderRadius: 20,
    marginRight: 10,
  },
  activeChip: { backgroundColor: Colors.light.walletPrimary },
  chipText: { fontSize: 13, fontWeight: "600", color: Colors.light.textSub },
  activeChipText: { color: "#FFF" },
  sectionHeader: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.textMain,
  },
  emptyText: {
    textAlign: "center",
    color: Colors.light.textSub,
    marginVertical: 20,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: Colors.light.walletPrimary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  fabText: { color: "#FFF", fontSize: 30, fontWeight: "300" },
});
