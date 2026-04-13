import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import SettingRow from "../../components/SettingRow";
import { Colors } from "../../constants/Colors";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>AS</Text>
          </View>
          <Text style={styles.name}>Aryan Saini</Text>
          <Text style={styles.subText}>Premium Member</Text>
        </View>

        {/* Settings Groups */}
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <Card>
          <SettingRow icon="user" title="Personal Information" />
          <SettingRow icon="bank" title="Linked Accounts" />
          <SettingRow icon="shield" title="Security & Privacy" />
        </Card>

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <Card>
          <SettingRow icon="bell" title="Notifications" />
          <SettingRow icon="moon-o" title="Dark Mode" />
          <SettingRow icon="question-circle" title="Help & Support" />
        </Card>
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
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
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
});
