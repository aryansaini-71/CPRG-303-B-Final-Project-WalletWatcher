import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useAuth } from "../context/AuthContext"; // Pulling in our engine!

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth(); // Grab the current user and the update function

  // Start the form with their real data, not hardcoded placeholders
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Name and Email cannot be empty.");
      return;
    }

    // Call our new context function to save globally
    await updateUser(name, email);

    Alert.alert("Success", "Profile information updated!", [
      { text: "OK", onPress: () => router.back() }, // Send them back to Profile when done
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

// Keeping Alex's clean styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  saveButton: {
    backgroundColor: Colors.light.walletDark,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
