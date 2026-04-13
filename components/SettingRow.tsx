import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";

interface SettingRowProps {
  icon: any;
  title: string;
  onPress?: () => void;
}

export default function SettingRow({ icon, title, onPress }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.iconBg}>
          <FontAwesome
            name={icon}
            size={18}
            color={Colors.light.walletPrimary}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome name="angle-right" size={20} color={Colors.light.textSub} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  left: { flexDirection: "row", alignItems: "center" },
  iconBg: {
    width: 36,
    height: 36,
    backgroundColor: "#F0F5F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  title: { fontSize: 16, color: Colors.light.textMain, fontWeight: "500" },
});
