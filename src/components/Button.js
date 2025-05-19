import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../theme";

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = "primary", // primary, secondary, outline, ghost, success, danger, warning, gradient
  size = "medium", // small, medium, large
  leftIcon,
  rightIcon,
  iconSize,
  fullWidth = false,
}) {
  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.secondary,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: COLORS.primary,
          borderWidth: 1,
        };
      case "ghost":
        return { backgroundColor: "transparent", borderWidth: 0 };
      case "success":
        return { backgroundColor: COLORS.success, borderColor: COLORS.success };
      case "danger":
        return { backgroundColor: COLORS.danger, borderColor: COLORS.danger };
      case "warning":
        return { backgroundColor: COLORS.warning, borderColor: COLORS.warning };
      case "gradient":
        return { backgroundColor: "transparent", borderWidth: 0 };
      default:
        return { backgroundColor: COLORS.primary, borderColor: COLORS.primary };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: SPACING.s,
          paddingHorizontal: SPACING.m,
          height: 40,
        };
      case "large":
        return {
          paddingVertical: SPACING.l,
          paddingHorizontal: SPACING.xl,
          height: 64,
        };
      default:
        return {
          paddingVertical: SPACING.m,
          paddingHorizontal: SPACING.l,
          height: 56,
        };
    }
  };

  const getTextColor = () => {
    if (variant === "outline" || variant === "ghost") return COLORS.primary;
    return COLORS.white;
  };

  const getIconSize = () => {
    if (iconSize) return iconSize;
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  const renderButtonContent = () => (
    <>
      {leftIcon && (
        <Feather
          name={leftIcon}
          size={getIconSize()}
          color={getTextColor()}
          style={styles.leftIcon}
        />
      )}
      <Text
        style={[
          styles.text,
          { color: getTextColor() },
          size === "small" && FONTS.small_semibold,
          size === "large" && FONTS.h4,
          textStyle,
        ]}
      >
        {title}
      </Text>
      {rightIcon && (
        <Feather
          name={rightIcon}
          size={getIconSize()}
          color={getTextColor()}
          style={styles.rightIcon}
        />
      )}
    </>
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
        Platform.OS === "android" && { elevation: 2 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={getTextColor()}
          size="small"
          style={{ alignSelf: "center" }}
        />
      ) : variant === "gradient" ? (
        <LinearGradient
          colors={[COLORS.primary_light, COLORS.primary_dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            getSizeStyle(),
            fullWidth && styles.fullWidth,
            { elevation: 0 },
          ]}
        >
          {renderButtonContent()}
        </LinearGradient>
      ) : (
        renderButtonContent()
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  text: {
    ...FONTS.body_semibold,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
  leftIcon: {
    marginRight: SPACING.s,
  },
  rightIcon: {
    marginLeft: SPACING.s,
  },
});
