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

import Card from "../../components/Card";
import SettingRow from "../../components/SettingRow";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext"; // 1. Import Auth

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth(); // 2. Pull user and logout function

  const handleLogout = async () => {
    await logout();
    // The Gatekeeper in _layout.tsx will automatically see user is null
    // and push you back to the login screen!
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header (Now Dynamic based on login!) */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            {/* Grab the first letter of their name, or default to U */}
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0) : "U"}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || "User"}</Text>
          <Text style={styles.subText}>{user?.email || "No email"}</Text>
        </View>

        {/* Settings Groups */}
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
          <SettingRow icon="bell" title="Notifications" />
          <SettingRow icon="moon-o" title="Dark Mode" />
          <SettingRow icon="question-circle" title="Help & Support" />
        </Card>

        {/* 3. The Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
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

  // New styles for logout button
  logoutButton: {
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "#FFE5E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB3B3",
  },
  logoutButtonText: {
    color: "#D32F2F",
    fontWeight: "bold",
    fontSize: 16,
  },
});
