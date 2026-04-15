import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Just for UI, we are mocking the backend

  const handleLogin = async () => {
    if (!email) return;

    // Call our mock login function
    await login(email);

    // Send them to the dashboard
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>🍃</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to Wallet Watcher</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="hello@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Create one</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  inner: { flex: 1, padding: 25, justifyContent: "center" },
  headerContainer: { alignItems: "center", marginBottom: 40 },
  iconPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: Colors.light.walletMint,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconText: { fontSize: 35 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.textMain,
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: Colors.light.textSub },
  formContainer: { marginBottom: 30 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.textSub,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#F9F9FB",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    color: Colors.light.textMain,
  },
  primaryButton: {
    backgroundColor: Colors.light.walletDark,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: Colors.light.walletDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: { color: Colors.light.textSub, fontSize: 15 },
  footerLink: {
    color: Colors.light.walletPrimary,
    fontSize: 15,
    fontWeight: "bold",
  },
});
