import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>ACCOUNT</Text>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>

        <Text style={styles.name}>Member</Text>
        <Text style={styles.role}>House Owner</Text>
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

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    padding: 28,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#DFE7E4",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#D1AF44",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
  },

  name: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#20403C",
  },

  role: {
    marginTop: 3,
    fontSize: 12,
    color: "#7C8D8A",
  },
});
