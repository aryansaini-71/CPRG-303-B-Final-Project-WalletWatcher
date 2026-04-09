import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.walletPrimary,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.cardBackground,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 20,
          height: 65,
          paddingBottom: 10,
        },
      }}
    >
      {/* 1. OVERVIEW TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      {/* 2. SPENDING TAB */}
      <Tabs.Screen
        name="spending"
        options={{
          title: "Spending",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" size={24} color={color} />
          ),
        }}
      />

      {/* 3. PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
