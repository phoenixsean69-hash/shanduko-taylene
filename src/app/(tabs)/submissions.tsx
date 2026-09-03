import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { router } from "expo-router";

const COLORS = {
  green: "#175744",
  greenSoft: "#E7F3EE",
  background: "#F4F7F5",
  white: "#FFFFFF",
  text: "#203A35",
  muted: "#7B8C87",
  border: "#D9E2DE",
};

export default function SubmissionsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>S</Text>
          </View>

          <View>
            <Text style={styles.brandName}>Shanduko</Text>
            <Text style={styles.brandSub}>
              Housing Cooperative
            </Text>
          </View>
        </View>

        <Text style={styles.eyebrow}>
          HOUSE OWNER PORTAL
        </Text>

        <Text style={styles.title}>
          Submissions
        </Text>

        <Text style={styles.subtitle}>
          Track member records submitted from your account.
        </Text>

        <View style={styles.card}>
          <View style={styles.emptyIcon}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.emptyTitle}>
            No submissions yet
          </Text>

          <Text style={styles.emptyText}>
            Member records you submit will appear here with their
            current verification status.
          </Text>

          <Pressable
            onPress={() => router.push("/add-member")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Add Member
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  logoText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
  },

  brandName: {
    color: COLORS.green,
    fontSize: 20,
    fontWeight: "800",
  },

  brandSub: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 2,
  },

  eyebrow: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 22,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 26,
    alignItems: "center",
  },

  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.greenSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  check: {
    color: COLORS.green,
    fontSize: 24,
    fontWeight: "700",
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 20,
  },

  button: {
    minHeight: 46,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
});
