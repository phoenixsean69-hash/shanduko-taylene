import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAddMember } from "./_layout";

export default function HouseholdScreen() {
  const { form, setForm } = useAddMember();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <Text onPress={() => router.back()} style={styles.back}>‹ Back</Text>
          <Text style={styles.step}>3 of 6</Text>
        </View>

        <Text style={styles.eyebrow}>MEMBER REGISTRATION</Text>

        <Text style={styles.title}>Household Details</Text>

        <Text style={styles.subtitle}>Next of kin and household information will be captured here.</Text>

        <View style={styles.progress}>
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={[styles.progressPart, styles.active]} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>NEXT OF KIN NAME</Text>
          <TextInput style={styles.input} value={form.nextOfKin} onChangeText={(v) => setForm({ nextOfKin: v })} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>HOUSEHOLD SIZE</Text>
          <TextInput style={styles.input} value={form.householdSize} onChangeText={(v) => setForm({ householdSize: v })} keyboardType="numeric" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>ADDRESS</Text>
          <TextInput style={styles.input} value={form.address} onChangeText={(v) => setForm({ address: v })} />
        </View>

        <View style={styles.actions}>
          <Text onPress={() => router.push('/add-member/spouse')} style={styles.cancel}>‹ Back</Text>
          <Text onPress={() => router.push('/add-member/documents')} style={styles.continue}>Continue →</Text>
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

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  back: {
    color: "#175744",
    fontSize: 14,
    fontWeight: "600",
  },

  step: {
    color: "#7B8C87",
    fontSize: 11,
    fontWeight: "600",
  },

  progress: {
    flexDirection: "row",
    gap: 4,
    marginVertical: 16,
  },

  progressPart: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#DCE5E1",
  },

  active: {
    backgroundColor: "#175744",
  },

  field: {
    marginBottom: 14,
  },

  label: {
    color: "#5C716B",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#BFCBC6",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    color: "#203A35",
    fontSize: 13,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },

  cancel: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#D9E2DE",
    color: "#175744",
    fontSize: 13,
    fontWeight: "600",
  },

  continue: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 9,
    backgroundColor: "#175744",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
