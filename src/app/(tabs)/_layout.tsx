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
    </NativeTabs>
  );
}
