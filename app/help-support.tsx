import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Card from "../components/Card";
import SettingRow from "../components/SettingRow";
import { Colors } from "../constants/Colors";

export default function HelpSupportScreen() {
  const router = useRouter();

  const showMessage = (title: string) => {
    Alert.alert(title, "This feature will be added soon.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>
            Get help, contact support, and find useful information about the
            app.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>SUPPORT</Text>
        <Card>
          <SettingRow
            icon="question-circle"
            title="FAQ"
            onPress={() => showMessage("FAQ")}
          />
          <SettingRow
            icon="envelope"
            title="Contact Support"
            onPress={() => showMessage("Contact Support")}
          />
          <SettingRow
            icon="bug"
            title="Report a Bug"
            onPress={() => showMessage("Report a Bug")}
          />
          <SettingRow
            icon="comment"
            title="Send Feedback"
            onPress={() => showMessage("Send Feedback")}
          />
        </Card>

        <View style={{ height: 25 }} />

        <Text style={styles.sectionLabel}>APP</Text>
        <Card>
          <SettingRow
            icon="bell"
            title="Notifications Help"
            onPress={() => router.push("/notifications")}
          />
          <SettingRow
            icon="info-circle"
            title="App Information"
            onPress={() =>
              Alert.alert(
                "Wallet Watcher",
                "Version 1.0.0\nBuilt with Expo React Native.",
              )
            }
          />
        </Card>

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
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  container: { padding: 20, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 25 },
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
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.light.textSub,
    marginLeft: 10,
    marginBottom: 10,
    letterSpacing: 1,
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
