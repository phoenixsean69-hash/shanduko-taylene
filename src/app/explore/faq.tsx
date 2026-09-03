import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const FAQ = [
  { q: 'How do I register a member?', a: 'Use the Add Member flow from the Members tab.' },
  { q: 'How are submissions verified?', a: 'Submissions undergo review by cooperative admins.' },
];

export default function FAQScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.title}>FAQ</Text>

        {FAQ.map((item, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{item.q}</Text>
            <Text style={styles.cardText}>{item.a}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F7F5" },
  container: { padding: 20, paddingBottom: 36 },
  back: { marginBottom: 8 },
  backText: { color: "#175744", fontWeight: "700" },
  title: { fontSize: 28, fontWeight: "700", color: "#203A35", marginBottom: 12 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#D9E2DE" },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#175744" },
  cardText: { marginTop: 8, color: "#203A35", fontSize: 13 },
});
