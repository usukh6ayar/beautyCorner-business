import React from "react";
import { View, Text, FlatList } from "react-native";
import appointments from "../mockdata/appointments";
import StatCard from "../components/StatCard";
import AppointmentCard from "../components/AppointmentCard";

export default function Dashboard() {
  const todayAppointments = appointments.filter((a) => a.date === "2025-05-08");

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Тавтай морил!
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StatCard label="Өнөөдөр" value={todayAppointments.length.toString()} />
        <StatCard label="Орлого" value="₮120,000" />
      </View>

      <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 24 }}>
        Захиалгууд
      </Text>
      <FlatList
        data={todayAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AppointmentCard data={item} />}
      />
    </View>
  );
}
