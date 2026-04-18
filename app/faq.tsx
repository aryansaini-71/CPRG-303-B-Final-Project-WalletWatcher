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

export default function FAQScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>FAQ</Text>
          <Text style={styles.subtitle}>
            Find answers to common questions about Wallet Watcher.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I add a transaction?</Text>
            <Text style={styles.answer}>
              Go to the Add Transaction page, enter the details, and save it.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I view my spending?</Text>
            <Text style={styles.answer}>
              Open the Spending page to track and review your expenses.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I edit a transaction?</Text>
            <Text style={styles.answer}>
              Select a transaction and choose the edit option to update its
              details.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>Is my data saved in the app?</Text>
            <Text style={styles.answer}>
              Yes, your data is stored locally for your demo version of the app.
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
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.textMain,
    marginBottom: 6,
  },
  answer: {
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
