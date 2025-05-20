import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import appointments from "../mockdata/appointments";
import StatCard from "../components/StatCard";
import ScreenHeader from "../components/ScreenHeader";
import { COLORS, FONTS, SIZES, SPACING } from "../theme";
import Icon from "react-native-vector-icons/Feather";
import { LineChart } from "react-native-chart-kit";

const PERIODS = [
  { label: "Сүүлийн 7 хоног", value: 7 },
  { label: "Сүүлийн 14 хоног", value: 14 },
  { label: "Сүүлийн 1 сар", value: 30 },
];

const HomeScreen = ({ navigation }) => {
  const userName = "Салон Beauty"; // Should come from auth

  // Filter state
  const [period, setPeriod] = useState(PERIODS[0]);
  const [isPeriodModalVisible, setPeriodModalVisible] = useState(false);

  // Сүүлийн N хоногийн орлогын дата үүсгэх
  const getLastNDaysRevenue = (n) => {
    const days = [];
    const revenues = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      days.push(`${d.getMonth() + 1}/${d.getDate()}`);
      const dayRevenue = appointments
        .filter((a) => a.status === "completed" && a.date === dateStr)
        .reduce((sum, a) => sum + a.price, 0);
      revenues.push(dayRevenue);
    }
    return { days, revenues };
  };

  // Сонгосон хугацаанд багтах appointment-уудыг буцаах функц
  const getLastNDaysAppointments = (n) => {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return appointments.filter((a) => dates.includes(a.date));
  };

  const { days, revenues } = getLastNDaysRevenue(period.value);
  const filteredAppointments = getLastNDaysAppointments(period.value);

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
          value={filteredAppointments.length}
          icon="calendar"
          color={COLORS.primary}
          trend="10"
          trendDirection="up"
        />
        <StatCard
          title="Хүлээгдэж буй"
          value={
            filteredAppointments.filter((a) => a.status === "pending").length
          }
          icon="clock"
          color={COLORS.warning}
          trend="5"
          trendDirection="down"
        />
        <StatCard
          title="Хийгдсэн"
          value={
            filteredAppointments.filter((a) => a.status === "completed").length
          }
          icon="check-circle"
          color={COLORS.success}
          trend="15"
          trendDirection="up"
        />
        <StatCard
          title="Цуцлагдсан"
          value={
            filteredAppointments.filter((a) => a.status === "cancelled").length
          }
          icon="x-circle"
          color={COLORS.danger}
          trend="8"
          trendDirection="down"
        />
      </View>
      <View style={styles.filterRow}>
        <Text style={styles.sectionTitle}>{period.label}ийн орлого</Text>
        <TouchableOpacity
          onPress={() => setPeriodModalVisible(true)}
          style={styles.iconButton}
        >
          <Icon name="calendar" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {/* Period сонгох modal */}
      <Modal
        visible={isPeriodModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPeriodModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPeriodModalVisible(false)}
        >
          <Pressable style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Хугацаа сонгох</Text>
            {PERIODS.map((p) => (
              <TouchableOpacity
                key={p.value}
                style={styles.modalOption}
                onPress={() => {
                  setPeriod(p);
                  setPeriodModalVisible(false);
                }}
              >
                <Icon
                  name="clock"
                  size={18}
                  color={COLORS.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalOptionText}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
      <LineChart
        data={{
          labels: days,
          datasets: [{ data: revenues }],
        }}
        width={Dimensions.get("window").width - 32}
        height={240}
        yAxisSuffix=" ₮"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#e0f7fa",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#007AFF",
          },
          propsForBackgroundLines: {
            strokeDasharray: "", // solid lines
            stroke: "#ddd",
          },
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{ borderRadius: 16, marginBottom: 24 }}
      />
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
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.m,
    flex: 1,
  },
  iconButton: {
    marginLeft: SPACING.s,
    padding: 4,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  modalOptionText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
