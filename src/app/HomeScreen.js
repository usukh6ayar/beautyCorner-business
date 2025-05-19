import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import appointments from "../mockdata/appointments";
import StatCard from "../components/StatCard";
import AppointmentCard from "../components/AppointmentCard";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES, SPACING } from "../theme";

const HomeScreen = ({ navigation }) => {
  const userName = "Салон Beauty"; // Should come from auth
  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === today);

  const totalAppointments = appointments.length;
  const completed = appointments.filter((a) => a.status === "completed").length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const cancelled = appointments.filter((a) => a.status === "cancelled").length;
  const revenue = appointments
    .filter((a) => a.status === "completed")
    .reduce((sum, a) => sum + a.price, 0);

  const handleReschedule = (id) => {
    navigation.navigate("RescheduleScreen", { appointmentId: id });
  };

  const handleCancel = (id) => {
    // Update status to cancelled (implement in state management)
    console.log("Cancel appointment:", id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={`Тавтай морил, ${userName}`}
        subtitle="Өнөөдрийн тойм"
        rightIcon="settings"
        onRightPress={() => navigation.navigate("SettingsScreen")}
      />
      <View style={styles.statsContainer}>
        <StatCard
          title="Бүгд"
          value={totalAppointments}
          icon="calendar"
          color={COLORS.primary}
          trend="10"
          trendDirection="up"
        />
        <StatCard
          title="Хүлээгдэж буй"
          value={pending}
          icon="clock"
          color={COLORS.warning}
          trend="5"
          trendDirection="down"
        />
        <StatCard
          title="Хийгдсэн"
          value={completed}
          icon="check-circle"
          color={COLORS.success}
          trend="15"
          trendDirection="up"
        />
        <StatCard
          title="Цуцлагдсан"
          value={cancelled}
          icon="x-circle"
          color={COLORS.danger}
          trend="8"
          trendDirection="down"
        />
      </View>
      <Text style={styles.sectionTitle}>Өнөөдрийн захиалгууд</Text>
      {todayAppointments.length === 0 ? (
        <Text style={styles.noAppointments}>Өнөөдөр захиалга алга.</Text>
      ) : (
        <FlatList
          data={todayAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              onReschedule={() => handleReschedule(item.id)}
              onCancel={() => handleCancel(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
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
    paddingHorizontal: SPACING.m,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  noAppointments: {
    ...FONTS.body,
    color: COLORS.text_secondary,
    textAlign: "flex-start",
    marginTop: SPACING.l,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  addButton: {
    margin: SPACING.m,
  },
});
