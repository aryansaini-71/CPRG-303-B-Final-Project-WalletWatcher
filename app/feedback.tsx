import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "../constants/Colors";

export default function FeedbackScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      setError("Please enter your feedback first.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
    setName("");
    setFeedback("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Send Feedback</Text>
          <Text style={styles.subtitle}>
            Share your thoughts to help us improve Wallet Watcher.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Feedback</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write your feedback here"
            placeholderTextColor="#999"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            textAlignVertical="top"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {submitted ? (
            <Text style={styles.successText}>
              Feedback submitted successfully!
            </Text>
          ) : null}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.textMain,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSub,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.textMain,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.light.textMain,
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.light.textMain,
    height: 140,
    marginBottom: 20,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  successText: {
    color: "green",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: Colors.light.walletDark,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#EAEAEA",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: Colors.light.textMain,
    fontWeight: "bold",
    fontSize: 16,
  },
});
