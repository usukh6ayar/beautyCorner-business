import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../theme";

export default function ScreenHeader({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBackButton = false,
  onBackPress,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={COLORS.text} />
          </TouchableOpacity>
        )}

        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            <Feather name={leftIcon} size={24} color={COLORS.text} />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{title}</Text>
      </View>

      {rightIcon && (
        <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
          <Feather name={rightIcon} size={24} color={COLORS.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 8,
  },
  iconButton: {
    marginRight: 8,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.text,
  },
});
