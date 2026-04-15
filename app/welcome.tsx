import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../constants/Colors";

export default function WelcomeScreen() {
  const router = useRouter(); // Initialize the router to handle button clicks

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section: The Illustration */}
      <View style={styles.imageSection}>
        {/* We use a stylized circle with emojis as a placeholder for the illustration */}
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.illustrationText}>💸</Text>
          <View style={styles.floatingCoin}>
            <Text style={styles.coinText}>🪙</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section: Text and Buttons */}
      <View style={styles.bottomSection}>
        {/* Title & Subtitle */}
        <Text style={styles.title}>Take total control of your money</Text>
        <Text style={styles.subtitle}>
          Become your own money manager and make every cent count
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* Sign Up Button (Primary) */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Log In Button (Secondary) */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.secondaryButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  // -- Image Section Styles --
  imageSection: {
    flex: 1.5, // Takes up more space than the bottom
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationPlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: Colors.light.walletMint,
    borderRadius: 125,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  illustrationText: {
    fontSize: 80,
  },
  floatingCoin: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  coinText: {
    fontSize: 30,
  },

  // -- Text & Button Section Styles --
  bottomSection: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.textMain,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSub,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  // -- Button Styles --
  buttonContainer: {
    width: "100%",
    gap: 15, // Puts space between the two buttons automatically
  },
  primaryButton: {
    backgroundColor: Colors.light.walletDark,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#F2F2F7", // Light gray/blue
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: Colors.light.textMain,
    fontSize: 18,
    fontWeight: "bold",
  },
});
