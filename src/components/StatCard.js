import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS, SIZES } from "../theme";

export default function StatCard({ label, value, icon, color }) {
  const cardColor = color || COLORS.primary;
  const IconComponent = icon || "bar-chart-2";

  return (
    <View style={[styles.card, { borderLeftColor: cardColor }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View
        style={[styles.iconContainer, { backgroundColor: cardColor + "15" }]}
      >
        <Feather name={IconComponent} size={20} color={cardColor} />
      </View>
    </View>
  );
}

export function StatCardRow({ children }) {
  return <View style={styles.row}>{children}</View>;
}

export function StatCardGrid({ children }) {
  return <View style={styles.grid}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -SIZES.base,
  },
  card: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.card_padding,
    marginBottom: 12,
    marginHorizontal: SIZES.base,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...SHADOWS.small,
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    ...FONTS.small,
    color: COLORS.text_secondary,
    marginBottom: 4,
  },
  value: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
