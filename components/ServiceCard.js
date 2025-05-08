import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ServiceCard({ data, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{data.name}</Text>
      <Text>Үнэ: ₮{data.price}</Text>
      <Text>Хугацаа: {data.duration}</Text>
      {onDelete && <Button title="Устгах" color="#d9534f" onPress={onDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
