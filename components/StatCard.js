import React from "react";
import { View, Text } from "react-native";

export default function StatCard({ label, value }) {
  return (
    <View
      style={{
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 8,
        width: "48%",
      }}
    >
      <Text style={{ fontSize: 14, color: "#666" }}>{label}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{value}</Text>
    </View>
  );
}
