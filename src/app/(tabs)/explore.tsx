import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const COLORS = {
  green: "#175744",
  greenSoft: "#E7F3EE",
  background: "#F4F7F5",
  white: "#FFFFFF",
  text: "#203A35",
  muted: "#7B8C87",
  border: "#D9E2DE",
};

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            EXPLORE
          </Text>

          <Text style={styles.title}>
            Discover
          </Text>

          <Text style={styles.subtitle}>
            Browse information about the housing cooperative
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Coming Soon
          </Text>

          <Text style={styles.cardText}>
            More features and content will be available here.
          </Text>
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

  header: {
    marginBottom: 32,
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

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: "center",
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  cardText: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});
