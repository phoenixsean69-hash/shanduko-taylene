import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>PREFERENCES</Text>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Manage your account and app preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive important alerts and updates</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#D9E2DE", true: "#E7F3EE" }}
              thumbColor={notificationsEnabled ? "#175744" : "#7B8C87"}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Email Updates</Text>
              <Text style={styles.settingDescription}>Receive updates via email</Text>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: "#D9E2DE", true: "#E7F3EE" }}
              thumbColor={emailUpdates ? "#175744" : "#7B8C87"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Use dark theme for the app</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#D9E2DE", true: "#E7F3EE" }}
              thumbColor={darkMode ? "#175744" : "#7B8C87"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <Pressable style={styles.settingButton}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingDescription}>Update your account password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#7B8C87" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.settingButton}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
              <Text style={styles.settingDescription}>Review our privacy practices</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#7B8C87" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.settingButton}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>About & Legal</Text>
              <Text style={styles.settingDescription}>App version and legal information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#7B8C87" />
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
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
    marginBottom: 28,
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

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9E2DE",
    marginBottom: 16,
    overflow: "hidden",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#175744",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  settingContent: {
    flex: 1,
  },

  settingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#203A35",
  },

  settingDescription: {
    fontSize: 12,
    color: "#7B8C87",
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: "#E7F3EE",
    marginHorizontal: 18,
  },

  logoutButton: {
    backgroundColor: "#175744",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
