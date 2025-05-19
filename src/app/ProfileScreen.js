import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

const DEFAULT_AVATAR = require("../../assets/icon.png");

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: "Гоо сайхны төв",
    email: "beauty@example.com",
    phone: "99112233",
    description: "Салон үйлчилгээ 10+ жилийн туршлагатай.",
    avatar: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    setEditMode(false);
    // TODO: Send profile to backend
  };

  const handlePickImage = async () => {
    setShowImageModal(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfile({ ...profile, avatar: result.assets[0].uri });
    }
  };

  const handleTakePhoto = async () => {
    setShowImageModal(false);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setProfile({ ...profile, avatar: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Профайл"
        rightIcon={editMode ? "x" : "edit-2"}
        onRightPress={() => setEditMode((prev) => !prev)}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
        <View style={styles.avatarContainer}>
          <Image
            source={profile.avatar ? { uri: profile.avatar } : DEFAULT_AVATAR}
            style={styles.avatar}
          />
          {editMode && (
            <TouchableOpacity
              style={styles.avatarEdit}
              onPress={() => setShowImageModal(true)}
            >
              <Feather name="camera" size={22} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Нэр</Text>
          <TextInput
            style={[styles.input, !editMode && styles.inputDisabled]}
            value={profile.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Нэр"
            placeholderTextColor={COLORS.text_secondary}
            accessibilityLabel="Салоны нэр"
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Имэйл</Text>
          <TextInput
            style={[styles.input, !editMode && styles.inputDisabled]}
            value={profile.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Имэйл"
            placeholderTextColor={COLORS.text_secondary}
            keyboardType="email-address"
            accessibilityLabel="Имэйл хаяг"
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Утас</Text>
          <TextInput
            style={[styles.input, !editMode && styles.inputDisabled]}
            value={profile.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Утас"
            placeholderTextColor={COLORS.text_secondary}
            keyboardType="phone-pad"
            accessibilityLabel="Утасны дугаар"
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Тайлбар</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              !editMode && styles.inputDisabled,
            ]}
            value={profile.description}
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Тайлбар"
            placeholderTextColor={COLORS.text_secondary}
            multiline
            numberOfLines={4}
            accessibilityLabel="Салоны тайлбар"
            editable={editMode}
          />
        </View>
        {editMode && (
          <Button
            title="Хадгалах"
            variant="gradient"
            size="large"
            leftIcon="save"
            fullWidth
            onPress={handleSave}
            style={styles.saveButton}
          />
        )}
      </Animated.View>
      <Modal
        visible={showImageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowImageModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Зураг солих</Text>
            <Button
              title="Галерейгаас сонгох"
              leftIcon="image"
              onPress={handlePickImage}
              style={{ marginBottom: SPACING.m }}
              fullWidth
            />
            <Button
              title="Камер ашиглах"
              leftIcon="camera"
              onPress={handleTakePhoto}
              fullWidth
            />
          </View>
        </Pressable>
      </Modal>
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: SPACING.l,
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.accent,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 8,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
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
  inputDisabled: {
    backgroundColor: COLORS.gray_light,
    color: COLORS.text_secondary,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  saveButton: {
    marginTop: SPACING.l,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000055",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.xl,
    width: 300,
    alignItems: "center",
    ...SHADOWS.medium,
  },
  modalTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
});
