import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS, SIZES } from "../theme";

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = "primary", // primary, secondary, outline, ghost
  size = "medium", // small, medium, large
  leftIcon,
  rightIcon,
  iconSize,
  fullWidth = false,
}) {
  // Define variant styles
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
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      case "success":
        return {
          backgroundColor: COLORS.success,
          borderColor: COLORS.success,
        };
      case "danger":
        return {
          backgroundColor: COLORS.danger,
          borderColor: COLORS.danger,
        };
      case "warning":
        return {
          backgroundColor: COLORS.warning,
          borderColor: COLORS.warning,
        };
      default:
        return {
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
        };
    }
  };

  // Define size styles
  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
        };
      case "large":
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
        };
    }
  };

  // Define text color based on variant
  const getTextColor = () => {
    if (variant === "outline") return COLORS.primary;
    if (variant === "ghost") return COLORS.primary;
    return COLORS.white;
  };

  // Define icon size based on button size
  const getIconSize = () => {
    if (iconSize) return iconSize;

    switch (size) {
      case "small":
        return 14;
      case "large":
        return 20;
      default:
        return 16;
    }
  };

  // Loading state
  if (loading) {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          getVariantStyle(),
          getSizeStyle(),
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
        disabled={true}
      >
        <ActivityIndicator color={getTextColor()} size="small" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
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
          size === "large" && FONTS.h5,
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  text: {
    ...FONTS.body_semibold,
  },
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: "100%",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
