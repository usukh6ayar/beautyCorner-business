export const COLORS = {
  primary: "#5C4B99", // Softer, elegant purple
  primary_light: "#7B6ABF",
  primary_dark: "#3E2F6B",
  secondary: "#F28C82", // Warm coral
  secondary_light: "#F7A9A2",
  secondary_dark: "#D87066",
  success: "#34C759",
  info: "#40C4FF",
  warning: "#FFCA28",
  danger: "#FF5252",
  white: "#FFFFFF",
  black: "#121212",
  gray: "#64748B",
  gray_light: "#F1F5F9",
  gray_dark: "#1E293B",
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: "#1E293B",
  text_secondary: "#64748B",
  accent: "#E2E8F0",
};

export const SIZES = {
  base: 6,
  small: 10,
  medium: 14,
  large: 18,
  xlarge: 22,
  xxlarge: 28,

  // Font sizes (reduced by ~10-15%)
  h1: 28,
  h2: 22,
  h3: 18,
  h4: 16,
  h5: 14, // Reduced from 16
  h6: 12, // Reduced from 14
  body: 14, // Reduced from 16
  small: 12, // Reduced from 14
  tiny: 10, // Reduced from 12

  // Spacing (reduced by ~20%)
  padding: 16, // Reduced from 20
  margin: 16, // Reduced from 20

  // Radius (slightly reduced for compactness)
  radius_small: 6, // Reduced from 8
  radius: 10, // Reduced from 12
  radius_large: 14, // Reduced from 16
  radius_xlarge: 20, // Reduced from 24

  // Card styles
  card_padding: 16, // Reduced from 20
  card_margin: 8, // Reduced from 10
  card_radius: 10, // Reduced from 12

  // Button styles
  button_height: 48, // Reduced from 56
  button_radius: 10, // Reduced from 12

  // Input styles
  input_height: 48, // Reduced from 56
  input_radius: 10, // Reduced from 12
};

export const FONTS = {
  h1: {
    fontSize: SIZES.h1,
    fontWeight: "700",
    lineHeight: 34,
    fontFamily: "Inter-Bold",
  },
  h2: {
    fontSize: SIZES.h2,
    fontWeight: "700",
    lineHeight: 28,
    fontFamily: "Inter-Bold",
  },
  h3: {
    fontSize: SIZES.h3,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "Inter-SemiBold",
  },
  h4: {
    fontSize: SIZES.h4,
    fontWeight: "600",
    lineHeight: 22,
    fontFamily: "Inter-SemiBold",
  },
  h5: {
    fontSize: SIZES.h5,
    fontWeight: "500",
    lineHeight: 20,
    fontFamily: "Inter-Medium",
  },
  h6: {
    fontSize: SIZES.h6,
    fontWeight: "500",
    lineHeight: 18,
    fontFamily: "Inter-Medium",
  },
  body: {
    fontSize: SIZES.body,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },
  body_semibold: {
    fontSize: SIZES.body,
    fontWeight: "500",
    lineHeight: 20,
    fontFamily: "Inter-Medium",
  },
  body_bold: {
    fontSize: SIZES.body,
    fontWeight: "600",
    lineHeight: 20,
    fontFamily: "Inter-SemiBold",
  },
  small: {
    fontSize: SIZES.small,
    fontWeight: "400",
    lineHeight: 18,
    fontFamily: "Inter-Regular",
  },
  small_semibold: {
    fontSize: SIZES.small,
    fontWeight: "500",
    lineHeight: 18,
    fontFamily: "Inter-Medium",
  },
  small_bold: {
    fontSize: SIZES.small,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: "Inter-SemiBold",
  },
  tiny: {
    fontSize: SIZES.tiny,
    fontWeight: "400",
    lineHeight: 14,
    fontFamily: "Inter-Regular",
  },
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
};

export const SPACING = {
  xs: 4, // Reduced from 4 (unchanged for precision)
  s: 6, // Reduced from 8
  m: 12,
  l: 18,
  xl: 24,
  xxl: 32,
};

export default {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  SPACING,
};
