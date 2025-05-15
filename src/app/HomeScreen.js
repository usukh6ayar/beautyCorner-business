// src/app/HomeScreen.js

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import StatCard from "../components/StatCard";
import AppointmentCard from "../components/AppointmentCard";
import appointments from "../mockdata/appointments";
import { COLORS, SIZES, FONTS } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const userName = "Салон Beauty"; // Энэ нь login-с ирэх ёстой

  const totalAppointments = appointments.length;
  const completed = appointments.filter((a) => a.status === "completed").length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const cancelled = appointments.filter((a) => a.status === "cancelled").length;

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === today);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Тавтай морил, {userName} 👋</Text>

      <View style={styles.statsContainer}>
        <StatCard
          title="Бүгд"
          value={totalAppointments}
          icon="calendar"
          color={COLORS.primary}
        />
        <StatCard
          title="Хүлээгдэж буй"
          value={pending}
          icon="clock"
          color={COLORS.warning}
        />
        <StatCard
          title="Хийгдсэн"
          value={completed}
          icon="check-circle"
          color={COLORS.success}
        />
        <StatCard
          title="Цуцлагдсан"
          value={cancelled}
          icon="x-circle"
          color={COLORS.danger}
        />
      </View>

      <Text style={styles.sectionTitle}>Өнөөдрийн захиалгууд</Text>

      {todayAppointments.length === 0 ? (
        <Text style={styles.noAppointments}>Өнөөдөр захиалга алга.</Text>
      ) : (
        <FlatList
          data={todayAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AppointmentCard appointment={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
  },
  welcomeText: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.medium,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: SIZES.large,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.medium,
    marginBottom: 8,
  },
  noAppointments: {
    color: COLORS.gray,
    fontStyle: "italic",
  },
});
