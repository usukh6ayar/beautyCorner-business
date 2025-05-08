import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function AppointmentCard({ data, onConfirm, onCancel }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{data.customerName}</Text>
      <Text>
        {data.service} - {data.time}
      </Text>
      <Text style={styles.status}>Статус: {data.status}</Text>

      {data.status === "pending" && (
        <View style={styles.actions}>
          <Button title="Зөвшөөрөх" onPress={onConfirm} color="#28a745" />
          <Button title="Цуцлах" onPress={onCancel} color="#dc3545" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eaeaea",
    padding: 12,
    marginTop: 8,
    borderRadius: 6,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    marginTop: 4,
    color: "#555",
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
