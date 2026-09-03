import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor="#FFFFFF"
      indicatorColor="#E7F3EE"
      labelStyle={{
        default: {
          color: "#7B8C87",
        },
        selected: {
          color: "#175744",
        },
      }}
    >
      {/* HOME */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Home
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={{
            ios: {
              name: "house.fill",
            },
            android: {
              name: "home",
            },
            web: {
              name: "house",
            },
          }}
        />
      </NativeTabs.Trigger>

      {/* MEMBERS */}
      <NativeTabs.Trigger name="members">
        <NativeTabs.Trigger.Label>
          Members
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={{
            ios: {
              name: "person.2.fill",
            },
            android: {
              name: "group",
            },
            web: {
              name: "group",
            },
          }}
        />
      </NativeTabs.Trigger>

      {/* SUBMISSIONS */}
      <NativeTabs.Trigger name="submissions">
        <NativeTabs.Trigger.Label>
          Submissions
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={{
            ios: {
              name: "doc.text.fill",
            },
            android: {
              name: "description",
            },
            web: {
              name: "description",
            },
          }}
        />
      </NativeTabs.Trigger>

      {/* EXPLORE
          Intentionally NO ICON */}
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>
          Explore
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      {/* SETTINGS */}
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>
          Settings
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={{
            ios: {
              name: "gearshape.fill",
            },
            android: {
              name: "settings",
            },
            web: {
              name: "settings",
            },
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
