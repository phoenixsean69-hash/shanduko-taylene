import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>COOPERATIVE</Text>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Information, announcements and resources
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="megaphone" size={24} color="#175744" />
          </View>
          <Text style={styles.cardTitle}>Announcements</Text>
          <Text style={styles.cardText}>
            Stay updated with important cooperative news and upcoming events.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="document-text" size={24} color="#175744" />
          </View>
          <Text style={styles.cardTitle}>Policies & Guidelines</Text>
          <Text style={styles.cardText}>
            Review cooperative policies, bylaws and operational guidelines.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="call" size={24} color="#175744" />
          </View>
          <Text style={styles.cardTitle}>Contact Us</Text>
          <Text style={styles.cardText}>
            Reach out to cooperative management for assistance and inquiries.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="help-circle" size={24} color="#175744" />
          </View>
          <Text style={styles.cardTitle}>FAQ</Text>
          <Text style={styles.cardText}>
            Find answers to frequently asked questions about membership and procedures.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F7F5",
  },

  container: {
    padding: 20,
    paddingBottom: 36,
  },

  header: {
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#175744",
    marginBottom: 5,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#203A35",
  },

  subtitle: {
    fontSize: 13,
    color: "#7B8C87",
    marginTop: 6,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E2DE",
  },

  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E7F3EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#203A35",
    marginBottom: 4,
  },

  cardText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#7B8C87",
  },
});
