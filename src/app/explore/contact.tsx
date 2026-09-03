import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.title}>Contact Us</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="call" size={20} color="#175744" />
            <Text style={styles.rowText}>+1 (555) 123-4567</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail" size={20} color="#175744" />
            <Text
              style={[styles.rowText, styles.link]}
              onPress={() => Linking.openURL('mailto:info@shanduko.example')}
            >
              info@shanduko.example
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location" size={20} color="#175744" />
            <Text style={styles.rowText}>Community Hall, 123 Main Street</Text>
          </View>
        </View>
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
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  rowText: { marginLeft: 10, fontSize: 14, color: '#203A35' },
  link: { color: '#175744', textDecorationLine: 'underline' },
});
