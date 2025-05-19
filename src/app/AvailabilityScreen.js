import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

const defaultAvailability = {
  monday: "10:00 - 18:00",
  tuesday: "10:00 - 18:00",
  wednesday: "10:00 - 18:00",
  thursday: "10:00 - 18:00",
  friday: "10:00 - 17:00",
  saturday: "11:00 - 15:00",
  sunday: "Амралтын өдөр",
};

export default function AvailabilityScreen() {
  const [availability, setAvailability] = useState(defaultAvailability);

  const handleChange = (day, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Save availability to backend or local storage
    console.log("Saving availability:", availability);
  };

  const days = Object.keys(availability);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Цагийн хуваарь засах" showBackButton />
      <FlatList
        data={days}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.day}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
            <TextInput
              value={availability[item]}
              onChangeText={(val) => handleChange(item, val)}
              style={styles.input}
              placeholder="Жишээ: 10:00 - 18:00"
              placeholderTextColor={COLORS.text_secondary}
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Хадгалах"
        variant="gradient"
        size="large"
        leftIcon="save"
        fullWidth
        onPress={handleSave}
        style={styles.saveButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.m,
  },
  row: {
    marginBottom: SPACING.m,
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  day: {
    ...FONTS.h5,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  input: {
    ...FONTS.body,
    borderWidth: 1,
    borderColor: COLORS.accent,
    padding: SPACING.s,
    borderRadius: SIZES.radius_small,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  saveButton: {
    margin: SPACING.m,
  },
});
