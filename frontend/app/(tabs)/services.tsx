import { View, Text, StyleSheet } from "react-native";

export default function Services() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },
});
