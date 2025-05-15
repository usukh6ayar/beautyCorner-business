// src/components/AppointmentCard.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../theme";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return COLORS.success;
    case "pending":
      return COLORS.warning;
    case "cancelled":
      return COLORS.danger;
    default:
      return COLORS.gray;
  }
};

const AppointmentCard = ({ appointment }) => {
  const { clientName, serviceName, date, time, price, status } = appointment;

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.name}>{clientName}</Text>
        <Text style={[styles.status, { color: getStatusColor(status) }]}>
          {status}
        </Text>
      </View>

      <Text style={styles.service}>
        {serviceName} - {price.toLocaleString()}₮
      </Text>

      <View style={styles.row}>
        <Feather name="calendar" size={16} color={COLORS.gray} />
        <Text style={styles.datetime}>{date}</Text>

        <Feather
          name="clock"
          size={16}
          color={COLORS.gray}
          style={styles.iconSpacing}
        />
        <Text style={styles.datetime}>{time}</Text>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  status: {
    fontSize: 13,
    textTransform: "capitalize",
    fontWeight: "600",
  },
  service: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 12,
  },
  datetime: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 4,
  },
});
