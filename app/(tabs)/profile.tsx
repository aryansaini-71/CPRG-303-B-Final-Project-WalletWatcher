import AsyncStorage from "@react-native-async-storage/async-storage";
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

import Card from "../../components/Card";
import SettingRow from "../../components/SettingRow";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleWipeData = () => {
    Alert.alert(
      "FACTORY RESET",
      "This will delete ALL transactions and log you out. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Wipe Data",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            await logout();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || "User"}</Text>
          <Text style={styles.subText}>{user?.email || "No email"}</Text>
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <Card>
          <SettingRow
            icon="user"
            title="Personal Information"
            onPress={() => router.push("/personal-info")}
          />
          <SettingRow
            icon="bank"
            title="Linked Accounts"
            onPress={() => router.push("/linked-accounts")}
          />
          <SettingRow
            icon="shield"
            title="Security & Privacy"
            onPress={() => console.log("Security")}
          />
        </Card>

        <View style={{ height: 25 }} />

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <Card>
          <SettingRow
            icon="bell"
            title="Notifications"
            onPress={() => router.push("/notifications")}
          />
          <SettingRow
            icon="moon-o"
            title="Dark Mode"
            onPress={() => console.log("Dark Mode coming in v2!")}
          />
          <SettingRow
            icon="question-circle"
            title="Help & Support"
            onPress={() => router.push("../help-support")}
          />
        </Card>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={handleWipeData}>
          <Text style={styles.dangerButtonText}>Wipe All App Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  container: { padding: 20 },
  profileHeader: { alignItems: "center", marginVertical: 30 },
  avatarLarge: {
    width: 100,
    height: 100,
    backgroundColor: Colors.light.walletDark,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  avatarText: {
    color: Colors.light.walletMint,
    fontSize: 32,
    fontWeight: "bold",
  },
  name: { fontSize: 24, fontWeight: "bold", color: Colors.light.textMain },
  subText: { fontSize: 14, color: Colors.light.textSub, marginTop: 4 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.light.textSub,
    marginLeft: 10,
    marginBottom: 10,
    letterSpacing: 1,
  },
  logoutButton: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#FFE5E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB3B3",
  },
  logoutButtonText: { color: "#D32F2F", fontWeight: "bold", fontSize: 16 },
  dangerButton: {
    marginBottom: 40,
    backgroundColor: "transparent",
    padding: 16,
    alignItems: "center",
  },
  dangerButtonText: {
    color: "#999",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
