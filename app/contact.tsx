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

export default function ContactScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Contact Support</Text>
          <Text style={styles.subtitle}>
            Reach out to the Wallet Watcher support team for help.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>support@walletwatcher.com</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>+1 (403) 123-4567</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Support Hours</Text>
            <Text style={styles.value}>Monday - Friday, 9:00 AM - 5:00 PM</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>Calgary, Alberta, Canada</Text>
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
