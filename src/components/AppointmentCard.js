import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS, SIZES } from "../theme";

const STATUS_COLORS = {
  pending: COLORS.warning,
  confirmed: COLORS.success,
  cancelled: COLORS.danger,
  completed: COLORS.primary,
};

const STATUS_LABELS = {
  pending: "Хүлээгдэж буй",
  confirmed: "Баталгаажсан",
  cancelled: "Цуцлагдсан",
  completed: "Үйлчилгээ дууссан",
};

const STATUS_ICONS = {
  pending: "clock",
  confirmed: "check-circle",
  cancelled: "x-circle",
  completed: "check-circle",
};

export default function AppointmentCard({
  data,
  onConfirm,
  onCancel,
  onComplete,
  onPressCard,
}) {
  const statusColor = STATUS_COLORS[data.status] || COLORS.gray;
  const statusLabel = STATUS_LABELS[data.status] || data.status;
  const statusIcon = STATUS_ICONS[data.status] || "help-circle";

  const renderActionButtons = () => {
    if (data.status === "pending") {
      return (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Feather name="check" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Зөвшөөрөх</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Feather name="x" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Цуцлах</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (data.status === "confirmed") {
      return (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={onComplete}
          >
            <Feather name="check-circle" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Үйлчилгээ дууссан</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Feather name="x" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Цуцлах</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPressCard}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.customerSection}>
          <Text style={styles.customerName}>{data.customerName}</Text>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceText}>{data.service}</Text>
            <View style={styles.dot} />
            <Feather name="clock" size={14} color={COLORS.gray} />
            <Text style={styles.timeText}>{data.time}</Text>
          </View>
        </View>
        <View
          style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}
        >
          <Feather name={statusIcon} size={12} color={statusColor} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Feather
            name="phone"
            size={14}
            color={COLORS.gray}
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>+976 9911-2233</Text>
        </View>

        {data.notes && (
          <View style={styles.detailRow}>
            <Feather
              name="message-square"
              size={14}
              color={COLORS.gray}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{data.notes}</Text>
          </View>
        )}
      </View>

      {renderActionButtons()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.card_padding,
    marginBottom: 12,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  customerSection: {
    flex: 1,
  },
  customerName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    ...FONTS.body,
    color: COLORS.text_secondary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray,
    marginHorizontal: 6,
  },
  timeText: {
    ...FONTS.body,
    color: COLORS.text_secondary,
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...FONTS.small_semibold,
    marginLeft: 4,
  },
  cardBody: {
    marginBottom: (data) =>
      (data && data.status === "pending") || data.status === "confirmed"
        ? 12
        : 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    ...FONTS.small,
    color: COLORS.text_secondary,
    flexShrink: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_light,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius_small,
    flex: 1,
    marginHorizontal: 4,
  },
  confirmButton: {
    backgroundColor: COLORS.success,
  },
  cancelButton: {
    backgroundColor: COLORS.danger,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    ...FONTS.small_semibold,
    color: COLORS.white,
    marginLeft: 4,
  },
});
