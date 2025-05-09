import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import AppointmentCard from "../components/AppointmentCard";
import initialAppointments from "../mockdata/appointments";

const filters = ["all", "pending", "confirmed", "cancelled"];

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const updateStatus = (id, status) => {
    setAppointments(
      appointments.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const filteredAppointments =
    selectedFilter === "all"
      ? appointments
      : appointments.filter((app) => app.status === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Захиалгууд</Text>

      <View style={styles.filterRow}>
        {filters.map((status) => (
          <Pressable
            key={status}
            onPress={() => setSelectedFilter(status)}
            style={[
              styles.filterButton,
              selectedFilter === status && styles.activeFilter,
            ]}
          >
            <Text
              style={
                selectedFilter === status
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              {status.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppointmentCard
            data={item}
            onConfirm={() => updateStatus(item.id, "confirmed")}
            onCancel={() => updateStatus(item.id, "cancelled")}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  filterRow: { flexDirection: "row", marginBottom: 12 },
  filterButton: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  activeFilter: {
    backgroundColor: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "#333",
  },
});
