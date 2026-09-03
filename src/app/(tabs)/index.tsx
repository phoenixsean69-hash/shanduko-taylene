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

export default function HomeScreen() {
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

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>
            HOUSE OWNER PORTAL
          </Text>

          <Text style={styles.title}>
            Welcome
          </Text>

          <Text style={styles.subtitle}>
            Register and manage your household member submissions
            securely.
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/add-member")}
          style={({ pressed }) => [
            styles.addCard,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.addIcon}>
            <Text style={styles.plus}>+</Text>
          </View>

          <View style={styles.addText}>
            <Text style={styles.addTitle}>
              Add Member
            </Text>

            <Text style={styles.addSubtitle}>
              Register a new household member
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Recent submissions
            </Text>

            <Text style={styles.sectionSubtitle}>
              Records submitted from this account
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/(tabs)/submissions")}
          >
            <Text style={styles.viewAll}>
              View all
            </Text>
          </Pressable>
        </View>

        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyCheck}>✓</Text>
          </View>

          <Text style={styles.emptyTitle}>
            No recent submissions
          </Text>

          <Text style={styles.emptyText}>
            Submitted member records and their verification
            status will appear here.
          </Text>
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Text>✓</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>
              Secure owner access
            </Text>

            <Text style={styles.securityText}>
              Records are associated with the authenticated owner
              account. Additional verification will be required
              for future edits.
            </Text>
          </View>
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
    paddingBottom: 36,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 38,
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

  intro: {
    marginBottom: 20,
  },

  eyebrow: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 5,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },

  addCard: {
    backgroundColor: COLORS.green,
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  addIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  plus: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "300",
  },

  addText: {
    flex: 1,
  },

  addTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  addSubtitle: {
    color: "rgba(255,255,255,.72)",
    fontSize: 10,
    marginTop: 3,
  },

  arrow: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "300",
  },

  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 3,
  },

  viewAll: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "600",
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    padding: 24,
  },

  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.greenSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  emptyCheck: {
    color: COLORS.green,
    fontSize: 20,
    fontWeight: "700",
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 17,
    marginTop: 5,
  },

  securityCard: {
    marginTop: 15,
    padding: 14,
    backgroundColor: COLORS.greenSoft,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  securityIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  securityTitle: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "700",
  },

  securityText: {
    color: "#63766F",
    fontSize: 9,
    lineHeight: 15,
    marginTop: 3,
  },
});

