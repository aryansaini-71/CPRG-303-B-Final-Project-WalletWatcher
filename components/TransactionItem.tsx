import { useRouter } from "expo-router"; // Import the router to navigate
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useTransactions } from "../context/TransactionContext";

interface Props {
  id: string;
  title: string;
  category: string;
  amount: string;
  icon: string;
  isExpense: boolean;
}

export default function TransactionItem({
  id,
  title,
  category,
  amount,
  icon,
  isExpense,
}: Props) {
  const { deleteTransaction } = useTransactions();
  const router = useRouter(); // Initialize the router

  // Deletion logic
  const handleLongPress = () => {
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to remove "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ],
    );
  };

  // Edit logic (triggered by a normal tap)
  const handlePress = () => {
    // We send them to the edit screen, passing the ID in the route!
    router.push(`/edit-transaction?id=${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconBg}>
            <Text style={{ fontSize: 20 }}>{icon}</Text>
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sub}>{category}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.amt,
            {
              color: isExpense
                ? Colors.light.textMain
                : Colors.light.walletPrimary,
            },
          ]}
        >
          {isExpense ? `-${amount}` : `+${amount}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  left: { flexDirection: "row", alignItems: "center" },
  iconBg: {
    width: 44,
    height: 44,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  title: { fontSize: 16, fontWeight: "600", color: Colors.light.textMain },
  sub: { fontSize: 12, color: Colors.light.textSub },
  amt: { fontSize: 16, fontWeight: "700" },
});
