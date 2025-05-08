import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";

const defaultAvailability = {
  monday: "10:00 - 18:00",
  tuesday: "10:00 - 18:00",
  wednesday: "10:00 - 18:00",
  thursday: "10:00 - 18:00",
  friday: "10:00 - 17:00",
  saturday: "11:00 - 15:00",
  sunday: "Амралтын өдөр",
};

export default function AvailabilityScreen() {
  const [availability, setAvailability] = useState(defaultAvailability);

  const handleChange = (day, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const days = Object.keys(availability);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Цагийн хуваарь засах</Text>

      <FlatList
        data={days}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.day}>{item.toUpperCase()}</Text>
            <TextInput
              value={availability[item]}
              onChangeText={(val) => handleChange(item, val)}
              style={styles.input}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  row: { marginBottom: 12 },
  day: { fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
  },
});
