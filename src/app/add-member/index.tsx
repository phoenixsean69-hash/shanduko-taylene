import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

const COLORS = {
  green: "#175744",
  background: "#F4F7F5",
  white: "#FFFFFF",
  text: "#203A35",
  muted: "#7B8C87",
  border: "#BFCBC6",
};

export default function AddMemberScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <Text
            onPress={() => router.back()}
            style={styles.back}
          >
            ‹ Back
          </Text>

          <Text style={styles.step}>
            1 of 6
          </Text>
        </View>

        <Text style={styles.eyebrow}>
          MEMBER REGISTRY
        </Text>

        <Text style={styles.title}>
          Add Member
        </Text>

        <Text style={styles.subtitle}>
          Start with the primary member's legal identity and
          allocated stand.
        </Text>

        <View style={styles.progress}>
          <View style={[styles.progressPart, styles.active]} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.number}>01</Text>

            <View>
              <Text style={styles.cardTitle}>
                Primary Member
              </Text>

              <Text style={styles.cardSubtitle}>
                Legal identity and stand information
              </Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Field
              label="FULL NAME"
              placeholder="Enter full legal name"
            />

            <Field
              label="NATIONAL ID NUMBER"
              placeholder="Enter national ID"
            />

            <Field
              label="STAND / PLOT NUMBER"
              placeholder="Allocated stand or plot"
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.number}>02</Text>

            <View>
              <Text style={styles.cardTitle}>
                Spouse
              </Text>

              <Text style={styles.cardSubtitle}>
                Complete where a spouse is registered
              </Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Field
              label="SPOUSE FULL NAME"
              placeholder="Enter spouse name"
            />

            <Field
              label="SPOUSE NATIONAL ID"
              placeholder="Enter spouse national ID"
            />
          </View>
        </View>

        <View style={styles.actions}>
          <Text
            onPress={() => router.back()}
            style={styles.cancel}
          >
            Cancel
          </Text>

          <Text
            onPress={() =>
              router.push("/add-member/household")
            }
            style={styles.continue}
          >
            Continue →
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A0ADA8"
        style={styles.input}
      />
    </View>
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

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  back: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: "600",
  },

  step: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "600",
  },

  eyebrow: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  progress: {
    flexDirection: "row",
    gap: 4,
    marginVertical: 20,
  },

  progressPart: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#DCE5E1",
  },

  active: {
    backgroundColor: COLORS.green,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9E2DE",
    overflow: "hidden",
    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2EF",
  },

  number: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#E7F3EE",
    color: COLORS.green,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 11,
    fontWeight: "800",
    marginRight: 10,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },

  cardSubtitle: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 2,
  },

  cardBody: {
    padding: 17,
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
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    color: COLORS.text,
    fontSize: 13,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },

  cancel: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#D9E2DE",
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "600",
  },

  continue: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 9,
    backgroundColor: COLORS.green,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
