import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { TransactionProvider } from "../context/TransactionContext";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "login" || segments[0] === "register";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, isLoading, segments]);

  return (
    <Stack>
      {/* Main App */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Auth Screens */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />

      {/* Modals & Sub-pages */}
      <Stack.Screen
        name="add-transaction"
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

      {/* NEW: Notifications Screen */}
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
