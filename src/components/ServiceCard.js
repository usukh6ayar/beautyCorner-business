import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../theme";

export default function ServiceCard({ data, onDelete, onEdit, onPress }) {
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActions}>
        {onEdit && (
          <Animated.View style={[{ transform: [{ translateX: trans }] }]}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={onEdit}
            >
              <Feather name="edit-2" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </Animated.View>
        )}
        {onDelete && (
          <Animated.View style={[{ transform: [{ translateX: trans }] }]}>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={onDelete}
            >
              <Feather name="trash-2" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{data.name}</Text>
            <Text style={styles.category}>{data.category}</Text>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Feather name="dollar-sign" size={16} color={COLORS.primary} />
                <Text style={styles.detailText}>
                  ₮{data.price.toLocaleString()}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Feather name="clock" size={16} color={COLORS.primary} />
                <Text style={styles.detailText}>{data.duration}</Text>
              </View>
            </View>
          </View>
          <View style={styles.swipeIndicator}>
            <Feather name="chevron-left" size={20} color={COLORS.gray} />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.card_radius,
    padding: SIZES.card_padding,
    margin: SIZES.card_margin,
    ...SHADOWS.medium,
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
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  category: {
    ...FONTS.small,
    color: COLORS.text_secondary,
    marginBottom: SPACING.s,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.m,
  },
  detailText: {
    ...FONTS.body_semibold,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  swipeIndicator: {
    opacity: 0.6,
  },
  rightActions: {
    width: 140,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: SPACING.s,
  },
  actionButton: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    marginLeft: SPACING.s,
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
  },
});
