import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { TransactionProvider } from "../context/TransactionContext";

// We create an inner component to handle the routing logic
// because we can only use `useAuth` INSIDE the AuthProvider.
function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // If the app is still checking AsyncStorage, don't do anything yet
    if (isLoading) return;

    // Check if the user is currently on the login or register screen
    const inAuthGroup = segments[0] === "login" || segments[0] === "register";

    if (!user && !inAuthGroup) {
      // If there is no user, and they are trying to access the main app, kick them to login
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // If there IS a user, but they are stuck on the login screen, push them to the dashboard
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
    </Stack>
  );
}

export default function RootLayout() {
  return (
    // Wrapping the app so Auth check happens before Transactions load
    <AuthProvider>
      <TransactionProvider>
        <RootLayoutNav />
      </TransactionProvider>
    </AuthProvider>
  );
}
