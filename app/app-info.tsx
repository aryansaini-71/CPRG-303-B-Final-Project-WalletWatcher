import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "../constants/Colors";

export default function AppInfoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>App Information</Text>
          <Text style={styles.subtitle}>Learn more about Wallet Watcher.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.item}>
            <Text style={styles.label}>App Name</Text>
            <Text style={styles.value}>Wallet Watcher</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Version</Text>
            <Text style={styles.value}>1.0.0</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>
              Wallet Watcher is a simple expense tracking app that helps users
              manage income, track spending, and stay on budget.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Developed By</Text>
            <Text style={styles.value}>
              Wallet Watchers Team (Aryan, Alex, Sargam)
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.textMain,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSub,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  item: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.textMain,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: Colors.light.textSub,
    lineHeight: 22,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: Colors.light.walletDark,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
