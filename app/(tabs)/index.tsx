import { FontAwesome } from "@expo/vector-icons"; //  For the notification bell icon
import { Link, useRouter } from "expo-router"; // Added useRouter for clicking the profile/bell
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
import { useAuth } from "../../context/AuthContext";
import { useTransactions } from "../../context/TransactionContext";

export default function OverviewScreen() {
  const { transactions, balance, categories } = useTransactions();
  const { user } = useAuth();
  const router = useRouter(); // Initialize the router to handle button clicks

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filterOptions = ["All", ...categories];

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* INTERACTIVE HEADER SECTION */}
        <View style={styles.header}>
          {/* Left Side: Welcome Text */}
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{user?.name || "Guest"}</Text>
          </View>

          {/* Right Side: Bell Icon & Profile Picture */}
          <View style={styles.headerRight}>
            {/* Notification Bell Button */}
            <TouchableOpacity
              style={styles.bellButton}
              onPress={() => router.push("/notifications")}
            >
              <FontAwesome
                name="bell-o"
                size={24}
                color={Colors.light.textMain}
              />
              {/* Optional: A tiny red dot to show unread notifications */}
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            {/* Profile Picture Button */}
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <View style={styles.profileCircle}>
                <Text style={styles.profileInitial}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Text>
              </View>
            </TouchableOpacity>
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
          {filterOptions.map((cat) => (
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
                id={item.id}
                title={item.title}
                category={item.category}
                amount={`$${item.amount.toFixed(2)}`}
                icon={item.icon}
                isExpense={item.type === "expense"}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>
                No transactions found for "{activeTab}".
              </Text>
            </View>
          )}
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
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
  container: { padding: 20, paddingBottom: 80 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
  },

  // Styles for the right side of the header
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellButton: {
    marginRight: 20, // Pushes the bell away from the profile picture
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30", // iOS Red
    borderWidth: 2,
    borderColor: Colors.light.background,
  },

  welcomeText: { fontSize: 14, color: Colors.light.textSub, marginBottom: 4 },
  nameText: { fontSize: 24, fontWeight: "bold", color: Colors.light.textMain },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.walletMint,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.walletDark,
  },
  darkCard: {
    backgroundColor: Colors.light.walletDark,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    color: Colors.light.walletMint,
    fontSize: 12,
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyIcon: {
    fontSize: 40,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.walletPrimary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: Colors.light.walletPrimary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fabText: { fontSize: 30, color: "#FFF", fontWeight: "300", marginTop: -2 },
});
