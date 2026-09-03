import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>SHANDUKO</Text>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Application and account preferences.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Settings</Text>
        <Text style={styles.cardText}>
          Configure your Shanduko mobile experience.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6F5",
    padding: 20,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#24715B",
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#183A35",
    marginTop: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#7C8D8A",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#DFE7E4",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#20403C",
  },

  cardText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 19,
    color: "#7C8D8A",
  },
});
