import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function HouseholdScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>
          MEMBER REGISTRATION
        </Text>

        <Text style={styles.title}>
          Household Details
        </Text>

        <Text style={styles.subtitle}>
          Next of kin and household information will be captured here.
        </Text>

        <Text
          onPress={() => router.back()}
          style={styles.back}
        >
          ‹ Back
        </Text>
      </View>
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
  },

  eyebrow: {
    color: "#175744",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: "#203A35",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
  },

  subtitle: {
    color: "#7B8C87",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },

  back: {
    marginTop: 30,
    color: "#175744",
    fontSize: 14,
    fontWeight: "600",
  },
});
