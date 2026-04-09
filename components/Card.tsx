import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 28,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
});
