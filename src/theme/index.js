/**
 * Beauty Corner App Theme Configuration
 */

export const COLORS = {
  primary: "#4A3780", // Main primary color
  primary_light: "#6C5BA7",
  primary_dark: "#372863",

  secondary: "#FF7878", // Secondary color for accents
  secondary_light: "#FF9A9A",
  secondary_dark: "#E25E5E",

  success: "#28a745",
  info: "#17a2b8",
  warning: "#ffc107",
  danger: "#dc3545",

  white: "#FFFFFF",
  black: "#000000",

  gray: "#6c757d",
  gray_light: "#f8f9fa",
  gray_dark: "#343a40",

  background: "#FFFFFF",
  card: "#F9F9F9",
  text: "#212529",
  text_secondary: "#6c757d",
};

export const SIZES = {
  // Global default sizes
  base: 8,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,

  // Font sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  body: 16,
  small: 14,
  tiny: 12,

  // Spacing
  padding: 16,
  margin: 16,

  // Radius
  radius_small: 4,
  radius: 8,
  radius_large: 12,
  radius_xlarge: 20,

  // Card styles
  card_padding: 16,
  card_margin: 8,
  card_radius: 8,

  // Button styles
  button_height: 50,
  button_radius: 8,

  // Input styles
  input_height: 50,
  input_radius: 8,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontWeight: "bold", lineHeight: 38 },
  h2: { fontSize: SIZES.h2, fontWeight: "bold", lineHeight: 30 },
  h3: { fontSize: SIZES.h3, fontWeight: "bold", lineHeight: 24 },
  h4: { fontSize: SIZES.h4, fontWeight: "600", lineHeight: 22 },
  h5: { fontSize: SIZES.h5, fontWeight: "600", lineHeight: 20 },
  h6: { fontSize: SIZES.h6, fontWeight: "600", lineHeight: 18 },

  body: { fontSize: SIZES.body, lineHeight: 22 },
  body_semibold: { fontSize: SIZES.body, fontWeight: "500", lineHeight: 22 },
  body_bold: { fontSize: SIZES.body, fontWeight: "bold", lineHeight: 22 },

  small: { fontSize: SIZES.small, lineHeight: 18 },
  small_semibold: { fontSize: SIZES.small, fontWeight: "500", lineHeight: 18 },
  small_bold: { fontSize: SIZES.small, fontWeight: "bold", lineHeight: 18 },

  tiny: { fontSize: SIZES.tiny, lineHeight: 16 },
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export default {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  SPACING,
};
