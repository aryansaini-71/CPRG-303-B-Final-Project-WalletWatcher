import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

// 1. Import mock data
import { AppNotification, dummyNotifications } from "../data/mockData";

export default function NotificationsScreen() {
  // 2. Helper function to assign the correct icon based on notification type
  const getIconData = (type: string) => {
    switch (type) {
      case "warning":
        return {
          name: "exclamation-triangle",
          color: "#FFA000",
          bgColor: "#FFF4E5",
        };
      case "success":
        return { name: "check-circle", color: "#4CAF50", bgColor: "#E8F5E9" };
      default:
        return {
          name: "info-circle",
          color: Colors.light.walletPrimary,
          bgColor: "#E8F0FE",
        };
    }
  };

  // 3. Render function for each individual notification row
  const renderNotification = ({ item }: { item: AppNotification }) => {
    const iconData = getIconData(item.type);

    return (
      <View style={[styles.card, !item.read && styles.unreadCard]}>
        {/* Left Side: Dynamic Icon */}
        <View
          style={[styles.iconContainer, { backgroundColor: iconData.bgColor }]}
        >
          <FontAwesome
            name={iconData.name as any}
            size={20}
            color={iconData.color}
          />
        </View>

        {/* Right Side: Text & Date */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.dateText}>
              {new Date(item.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
          <Text style={styles.message}>{item.message}</Text>
        </View>

        {/* Small blue dot if it hasn't been read yet */}
        {!item.read && <View style={styles.unreadDot} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {dummyNotifications.length > 0 ? (
        <FlatList
          data={dummyNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome
            name="bell-slash-o"
            size={50}
            color={Colors.light.textSub}
          />
          <Text style={styles.emptyText}>You're all caught up!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  listPadding: { padding: 20 },

  // Card layout
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    // Soft shadow for depth
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  // Give unread cards a very subtle blue tint
  unreadCard: {
    backgroundColor: "#F8FBFF",
    borderColor: "#E6F0FF",
    borderWidth: 1,
  },

  // Icon styling
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  // Text styling
  textContainer: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: { fontSize: 16, fontWeight: "bold", color: Colors.light.textMain },
  dateText: { fontSize: 12, color: Colors.light.textSub },
  message: { fontSize: 14, color: Colors.light.textSub, lineHeight: 20 },

  // Unread indicator
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.walletPrimary,
    marginLeft: 10,
  },

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.textSub,
  },
});
