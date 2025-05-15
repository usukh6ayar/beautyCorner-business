// src/components/ServiceCard.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS, SIZES } from "../theme";
import { Swipeable } from "react-native-gesture-handler";

export default function ServiceCard({ data, onDelete, onEdit, onPress }) {
  // Render right swipe actions
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
        activeOpacity={0.7}
      >
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

          {/* Indicator to show swipe available */}
          <View style={styles.swipeIndicator}>
            <Feather name="chevron-left" size={18} color={COLORS.gray} />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.card_padding,
    marginHorizontal: SIZES.small,
    marginVertical: 6,
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
  swipeIndicator: {
    opacity: 0.5,
  },
  rightActions: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionButton: {
    width: 50,
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    marginRight: 8,
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
  },
});
