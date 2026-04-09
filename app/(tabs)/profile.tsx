import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>User Profile (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
});
