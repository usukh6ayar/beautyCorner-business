// src/app/AppointmentsScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import appointments from "../mockdata/appointments";
import AppointmentCard from "../components/AppointmentCard";
import { COLORS, FONTS, SIZES } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTERS = ["Бүгд", "Хүлээгдэж буй", "Хийгдсэн", "Цуцлагдсан"];
const [allAppointments, setAllAppointments] = useState(appointments);

const handleUpdateStatus = (id, newStatus) => {
  const updated = allAppointments.map((appt) =>
    appt.id === id ? { ...appt, status: newStatus } : appt
  );
  setAllAppointments(updated);
};

const AppointmentsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("Бүгд");

  const filteredAppointments = appointments.filter((appt) => {
    if (selectedFilter === "Бүгд") return true;
    if (selectedFilter === "Хүлээгдэж буй") return appt.status === "pending";
    if (selectedFilter === "Хийгдсэн") return appt.status === "completed";
    if (selectedFilter === "Цуцлагдсан") return appt.status === "cancelled";
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Захиалгууд</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[styles.tab, selectedFilter === filter && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                selectedFilter === filter && styles.activeTabText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointment List */}
      {filteredAppointments.length === 0 ? (
        <Text style={styles.emptyText}>Ийм төрлийн захиалга алга байна.</Text>
      ) : (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AppointmentCard appointment={item} onUpdate={handleUpdateStatus} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.small,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: SIZES.small,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
    color: COLORS.gray,
  },
});
