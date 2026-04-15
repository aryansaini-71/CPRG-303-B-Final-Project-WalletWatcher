import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BankAccount {
  id: string;
  name: string;
  lastFour: string;
}

const MOCK_BANKS: BankAccount[] = [
  { id: "1", name: "Chase Bank", lastFour: "8821" },
  { id: "2", name: "Wells Fargo", lastFour: "1092" },
];

export default function LinkedAccountsScreen() {
  const renderBankItem: ListRenderItem<BankAccount> = ({ item }) => (
    <View style={styles.bankRow}>
      <FontAwesome name="university" size={24} color="#1B4332" />
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>{item.name}</Text>
        <Text style={styles.bankDetails}>Checking •••• {item.lastFour}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_BANKS}
        keyExtractor={(item: BankAccount) => item.id}
        renderItem={renderBankItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert("Connect Bank", "Opening Plaid Link...")}
      >
        <Text style={styles.addButtonText}>+ Link New Bank Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F9F9" },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bankInfo: { marginLeft: 15 },
  bankName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  bankDetails: { color: "#666", fontSize: 13 },
  addButton: {
    marginTop: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: "#1B4332",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: { color: "#1B4332", fontWeight: "bold" },
});
