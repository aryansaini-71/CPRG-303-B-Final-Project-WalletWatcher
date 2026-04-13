import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface Props {
  title: string;
  category: string;
  amount: string;
  icon: string;
  isExpense: boolean;
}

export default function TransactionItem({
  title,
  category,
  amount,
  icon,
  isExpense,
}: Props) {
  return (
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
  title: { fontSize: 16, fontWeight: "600" },
  sub: { fontSize: 12, color: Colors.light.textSub },
  amt: { fontSize: 16, fontWeight: "700" },
});
