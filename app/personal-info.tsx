import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
}

export default function PersonalInfoScreen() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "Aryan Saini",
    email: "aryan@example.com",
    phone: "+1 234 567 890",
  });

  const handleSave = (): void => {
    Alert.alert("Success", "Profile information updated!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text: string) =>
          setFormData({ ...formData, name: text })
        }
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text: string) =>
          setFormData({ ...formData, email: text })
        }
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text: string) =>
          setFormData({ ...formData, phone: text })
        }
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  },
  saveButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
