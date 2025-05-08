import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Нүүр" }} />
      <Tabs.Screen name="appointments" options={{ title: "Захиалгууд" }} />
      <Tabs.Screen name="services" options={{ title: "Үйлчилгээ" }} />
      <Tabs.Screen name="availability" options={{ title: "Цагийн хуваарь" }} />
      <Tabs.Screen name="profile" options={{ title: "Профайл" }} />
    </Tabs>
  );
}
