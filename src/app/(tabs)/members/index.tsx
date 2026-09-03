import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MembersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>SHANDUKO HOUSING COOPERATIVE</Text>
          <Text style={styles.title}>Members</Text>
          <Text style={styles.subtitle}>
            Manage your household and membership records.
          </Text>
        </View>

        <Pressable
          style={styles.profile}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.profileLetter}>M</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.addCard}
        onPress={() => router.push("/add-member")}
      >
        <View style={styles.addIcon}>
          <Text style={styles.plus}>+</Text>
        </View>

        <View style={styles.addCopy}>
          <Text style={styles.addTitle}>Add Member</Text>
          <Text style={styles.addDescription}>
            Register a new house owner and household record.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Member Registry</Text>
        <Text style={styles.cardText}>
          View and manage registered cooperative members.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/member-registry")}
        >
          <Text style={styles.primaryText}>Open Registry</Text>
        </Pressable>
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

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#24715B",
    marginBottom: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#183A35",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#7C8D8A",
  },

  profile: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#D1AF44",
    alignItems: "center",
    justifyContent: "center",
  },

  profileLetter: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  addCard: {
    backgroundColor: "#175744",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  addIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    fontSize: 28,
    color: "#175744",
    fontWeight: "400",
  },

  addCopy: {
    flex: 1,
    marginLeft: 14,
  },

  addTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  addDescription: {
    color: "#DDEBE6",
    fontSize: 11,
    marginTop: 3,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 28,
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#DFE7E4",
  },

  cardTitle: {
    color: "#20403C",
    fontSize: 16,
    fontWeight: "600",
  },

  cardText: {
    color: "#7C8D8A",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: "#175744",
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
