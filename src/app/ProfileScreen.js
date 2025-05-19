import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: "Гоо сайхны төв",
    email: "beauty@example.com",
    phone: "99112233",
    description: "Салон үйлчилгээ 10+ жилийн туршлагатай.",
  });
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    console.log("Профайл хадгалагдлаа: ", profile);
    // TODO: Send profile to backend
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Профайл засах"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Нэр</Text>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Нэр"
            placeholderTextColor={COLORS.text_secondary}
            accessibilityLabel="Салоны нэр"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Имэйл</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Имэйл"
            placeholderTextColor={COLORS.text_secondary}
            keyboardType="email-address"
            accessibilityLabel="Имэйл хаяг"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Утас</Text>
          <TextInput
            style={styles.input}
            value={profile.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Утас"
            placeholderTextColor={COLORS.text_secondary}
            keyboardType="phone-pad"
            accessibilityLabel="Утасны дугаар"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Тайлбар</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.description}
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Тайлбар"
            placeholderTextColor={COLORS.text_secondary}
            multiline
            numberOfLines={4}
            accessibilityLabel="Салоны тайлбар"
          />
        </View>
        <Button
          title="Хадгалах"
          variant="gradient"
          size="large"
          leftIcon="save"
          fullWidth
          onPress={handleSave}
          style={styles.saveButton}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.m,
  },
  form: {
    flex: 1,
    paddingTop: SPACING.m,
  },
  inputContainer: {
    marginBottom: SPACING.m,
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  label: {
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
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  saveButton: {
    marginTop: SPACING.l,
  },
});
