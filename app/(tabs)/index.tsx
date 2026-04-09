import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { Colors } from "../../constants/Colors";

export default function OverviewScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.name}>Aryan Saini</Text>
        </View>

        <Card style={styles.darkCard}>
          <Text style={styles.label}>TOTAL BALANCE</Text>
          <Text style={styles.amount}>$12,450.00</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  scrollContent: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 25 },
  welcome: { fontSize: 16, color: Colors.light.textSub },
  name: { fontSize: 24, fontWeight: "bold", color: Colors.light.textMain },
  darkCard: {
    backgroundColor: Colors.light.walletDark,
    alignItems: "center",
    paddingVertical: 40,
  },
  label: {
    color: Colors.light.walletMint,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
  },
  amount: { color: "#FFFFFF", fontSize: 38, fontWeight: "bold" },
});
