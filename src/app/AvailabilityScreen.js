import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

const dayNames = {
  monday: "Даваа",
  tuesday: "Мягмар",
  wednesday: "Лхагва",
  thursday: "Пүрэв",
  friday: "Баасан",
  saturday: "Бямба",
  sunday: "Ням",
};

const defaultAvailability = {
  monday: "10:00 - 18:00",
  tuesday: "10:00 - 18:00",
  wednesday: "10:00 - 18:00",
  thursday: "10:00 - 18:00",
  friday: "10:00 - 17:00",
  saturday: "11:00 - 15:00",
  sunday: "Амралтын өдөр",
};

const AvailabilityItem = ({
  dayKey,
  value,
  editMode,
  onChange,
  onHoliday,
  onWorkday,
}) => {
  const isHoliday = value === "Амралтын өдөр";

  return (
    <View style={[styles.row, isHoliday && styles.rowHoliday]}>
      <View style={styles.rowHeader}>
        <Text style={styles.day}>{dayNames[dayKey]}</Text>
        {isHoliday && <Text style={styles.holidayLabel}>Амралтын өдөр</Text>}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={isHoliday ? "" : value}
          onChangeText={(val) => onChange(dayKey, val)}
          style={[
            styles.input,
            (!editMode || isHoliday) && styles.inputDisabled,
          ]}
          placeholder="10:00 - 18:00"
          placeholderTextColor={COLORS.text_secondary}
          editable={editMode && !isHoliday}
        />
        {editMode && (
          <TouchableOpacity
            style={[
              styles.statusButton,
              isHoliday ? styles.workday : styles.holiday,
            ]}
            onPress={() => (isHoliday ? onWorkday(dayKey) : onHoliday(dayKey))}
          >
            <Text style={styles.buttonText}>
              {isHoliday ? "Ажиллах" : "Амралт"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function AvailabilityScreen() {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (day, value) => {
    setAvailability((prev) => ({ ...prev, [day]: value }));
  };

  const handleSetHoliday = (day) => {
    setAvailability((prev) => ({ ...prev, [day]: "Амралтын өдөр" }));
  };

  const handleSetWorkday = (day) => {
    setAvailability((prev) => ({ ...prev, [day]: "" }));
  };

  const handleSave = () => {
    setEditMode(false);
    Alert.alert("Амжилттай", "Цагийн хуваарь хадгалагдлаа.");
  };

  const days = useMemo(() => Object.keys(availability), [availability]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Цагийн хуваарь" showBackButton />
      <FlatList
        data={days}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <AvailabilityItem
            dayKey={item}
            value={availability[item]}
            editMode={editMode}
            onChange={handleChange}
            onHoliday={handleSetHoliday}
            onWorkday={handleSetWorkday}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title={editMode ? "Хадгалах" : "Засах"}
        variant={editMode ? "gradient" : "outline"}
        size="large"
        leftIcon={editMode ? "save" : "edit-2"}
        fullWidth
        onPress={editMode ? handleSave : () => setEditMode(true)}
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
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: SIZES.radius_large,
    ...SHADOWS.small,
  },
  rowHoliday: {
    backgroundColor: COLORS.warning_light,
    borderColor: COLORS.warning,
    borderWidth: 1,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  day: {
    ...FONTS.h6,
    color: COLORS.text,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    ...FONTS.body,
    borderWidth: 1,
    borderColor: COLORS.gray_light,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  inputDisabled: {
    backgroundColor: COLORS.gray_lightest,
    color: COLORS.text_secondary,
    borderColor: COLORS.gray_light,
  },
  statusButton: {
    marginLeft: SPACING.s,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: SIZES.radius,
  },
  holiday: {
    backgroundColor: COLORS.warning,
  },
  workday: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    ...FONTS.small_bold,
    color: COLORS.white,
  },
  holidayLabel: {
    color: COLORS.warning_dark,
    ...FONTS.small,
    fontStyle: "italic",
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  saveButton: {
    margin: SPACING.m,
    width: "100%", // Button-г эцэг контейнерийн өргөнтэй тэнцүү болгоно
    alignSelf: "center", // төвд байрлуулах
  },
});
