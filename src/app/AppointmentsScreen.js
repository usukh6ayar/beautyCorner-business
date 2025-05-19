import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import appointments from "../mockdata/appointments";
import AppointmentCard from "../components/AppointmentCard";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

const FILTERS = ["Бүгд", "Хүлээгдэж буй", "Хийгдсэн", "Цуцлагдсан"];

const AppointmentsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("Бүгд");
  const [allAppointments, setAllAppointments] = useState(appointments);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = allAppointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAllAppointments(updated);
  };

  const handleReschedule = (id) => {
    navigation.navigate("RescheduleScreen", { appointmentId: id });
  };

  const handleCancel = (id) => {
    handleUpdateStatus(id, "cancelled");
  };

  const filteredAppointments = allAppointments.filter((appt) => {
    if (selectedFilter === "Бүгд") return true;
    if (selectedFilter === "Хүлээгдэж буй") return appt.status === "pending";
    if (selectedFilter === "Хийгдсэн") return appt.status === "completed";
    if (selectedFilter === "Цуцлагдсан") return appt.status === "cancelled";
    return false;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Захиалгууд"
        rightIcon="search"
        onRightPress={() => navigation.navigate("SearchScreen")}
      />
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
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        {filteredAppointments.length === 0 ? (
          <Text style={styles.emptyText}>Ийм төрлийн захиалга алга байна.</Text>
        ) : (
          <FlatList
            data={filteredAppointments}
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
      </Animated.View>
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: SPACING.m,
    paddingHorizontal: SPACING.s,
  },
  tab: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray_light,
    ...SHADOWS.small,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body,
    color: COLORS.text_secondary,
  },
  activeTabText: {
    ...FONTS.body_semibold,
    color: COLORS.white,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.text_secondary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.m,
  },
  addButton: {
    margin: SPACING.m,
  },
});
