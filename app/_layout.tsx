import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react"; // <-- Add 'React' right here!
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Colors } from "../constants/Colors";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { TransactionProvider } from "../context/TransactionContext";
function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. If Supabase is still thinking, do absolutely nothing yet.
    if (isLoading) return;

    // 2. Define our "public" pages
    const inAuthGroup =
      segments[0] === "welcome" ||
      segments[0] === "login" ||
      segments[0] === "register";

    if (!user && !inAuthGroup) {
      // 3. KICK OUT: They are not logged in but trying to see the dashboard
      router.replace("/welcome");
    } else if (user && inAuthGroup) {
      // 4. AUTO-LOGIN: They are already logged in but stuck on the login screen
      router.replace("/(tabs)");
    }
  }, [user, isLoading, segments]);

  // RUBRIC REQUIREMENT: Show a loading screen while Supabase restores the session
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.walletPrimary} />
      </View>
    );
  }

  return (
    <Stack>
      {/* Main App */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Auth Screens */}
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />

      {/* Modals & Sub-pages */}
      <Stack.Screen
        name="add-transaction"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="edit-transaction"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          headerTitle: "Personal Information",
          headerBackTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="linked-accounts"
        options={{ headerTitle: "Linked Accounts", headerBackTitle: "Profile" }}
      />
      <Stack.Screen
        name="notifications"
        options={{ headerTitle: "Notifications", headerBackTitle: "Home" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <RootLayoutNav />
      </TransactionProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
});
