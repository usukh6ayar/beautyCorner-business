import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS, SIZES } from "../theme";

export default function ServiceCard({ data, onDelete, onEdit, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{data.name}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Feather name="dollar-sign" size={14} color={COLORS.primary} />
              <Text style={styles.detailText}>
                ₮{data.price.toLocaleString()}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailItem}>
              <Feather name="clock" size={14} color={COLORS.primary} />
              <Text style={styles.detailText}>{data.duration}</Text>
            </View>
          </View>
        </View>

        {(onEdit || onDelete) && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={onEdit}
              >
                <Feather name="edit-2" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={onDelete}
              >
                <Feather name="trash-2" size={16} color={COLORS.danger} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
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
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    ...FONTS.body,
    color: COLORS.text_secondary,
    marginLeft: 4,
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.gray_light,
    marginHorizontal: 12,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: COLORS.primary + "15",
  },
  deleteButton: {
    backgroundColor: COLORS.danger + "15",
  },
});
