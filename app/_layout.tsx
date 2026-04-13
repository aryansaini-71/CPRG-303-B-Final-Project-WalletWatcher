import { Stack } from "expo-router";
import { TransactionProvider } from "../context/TransactionContext";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <Stack>
        {/* The main tab navigation group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* The Add Transaction screen - set as a Modal */}
        <Stack.Screen
          name="add-transaction"
          options={{
            presentation: "modal",
            headerTitle: "New Transaction",
            headerShown: false,
          }}
        />
      </Stack>
    </TransactionProvider>
  );
}
