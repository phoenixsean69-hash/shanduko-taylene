import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AnnouncementsScreen() {
  const items = [
    { id: 1, title: "Annual General Meeting", date: "2026-10-15", body: "AGM will be held at the community hall." },
    { id: 2, title: "Water Shutoff", date: "2026-09-21", body: "Planned water maintenance between 9:00–12:00." },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={20} color="#175744" />
          </Pressable>

          <Text style={styles.title}>Announcements</Text>
        </View>

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No announcements yet.</Text>
          </View>
        ) : (
          items.map((it) => (
            <View key={it.id} style={styles.card}>
              <Text style={styles.cardTitle}>{it.title}</Text>
              <Text style={styles.cardDate}>{it.date}</Text>
              <Text style={styles.cardText}>{it.body}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F7F5" },
  container: { padding: 20, paddingBottom: 36 },
  header: { paddingBottom: 12, flexDirection: "row", alignItems: "center" },
  back: { marginRight: 8 },
  title: { fontSize: 20, fontWeight: "700", color: "#203A35" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#D9E2DE" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#175744" },
  cardDate: { fontSize: 12, color: "#7B8C87", marginTop: 4 },
  cardText: { marginTop: 8, color: "#203A35", fontSize: 13 },
  empty: { paddingTop: 40, alignItems: "center" },
  emptyText: { color: "#7B8C87" },
});
