import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
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

const AppointmentCard = ({ appointment, onReschedule, onCancel }) => {
  const { clientName, serviceName, date, time, price, status, stylist } =
    appointment;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.clientName}>{clientName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(status) },
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Feather name="scissors" size={16} color={COLORS.text_secondary} />
          <Text style={styles.detailText}>{serviceName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="user" size={16} color={COLORS.text_secondary} />
          <Text style={styles.detailText}>Stylist: {stylist}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="calendar" size={16} color={COLORS.text_secondary} />
          <Text style={styles.detailText}>
            {date} at {time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="dollar-sign" size={16} color={COLORS.text_secondary} />
          <Text style={styles.detailText}>₮{price.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onReschedule}>
          <Text style={styles.actionText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.card_radius,
    padding: SIZES.card_padding,
    margin: SIZES.card_margin,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  clientName: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius_small,
  },
  statusText: {
    ...FONTS.small_bold,
    color: COLORS.white,
    textTransform: "capitalize",
  },
  details: {
    marginBottom: SPACING.m,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  detailText: {
    ...FONTS.body,
    color: COLORS.text_secondary,
    marginLeft: SPACING.xs,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radius,
    marginLeft: SPACING.s,
  },
  cancelButton: {
    backgroundColor: COLORS.danger,
  },
  actionText: {
    ...FONTS.body_semibold,
    color: COLORS.white,
  },
});
