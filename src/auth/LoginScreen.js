import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { COLORS, FONTS, SIZES, SHADOWS } from "../theme";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Анхааруулга", "Имэйл болон нууц үгээ оруулна уу.");
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      Alert.alert(
        "Алдаа",
        result.error || "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            {/* Replace with your app logo */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>Beauty Corner</Text>
            </View>
            <Text style={styles.tagline}>Салон менежментийн систем</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Имэйл хаяг"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Нууц үг"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Нууц үгээ мартсан?</Text>
            </TouchableOpacity>

            <Button
              title="Нэвтрэх"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Бүртгэл байхгүй юу? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Бүртгүүлэх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: SIZES.large * 2,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  logoText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  tagline: {
    marginTop: SIZES.medium,
    ...FONTS.body,
    color: COLORS.gray,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.small,
    ...SHADOWS.small,
  },
  inputIcon: {
    marginRight: SIZES.small,
  },
  input: {
    flex: 1,
    height: 50,
    paddingVertical: SIZES.small,
    ...FONTS.body,
    color: COLORS.text,
  },
  eyeIcon: {
    padding: SIZES.small,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: SIZES.medium,
  },
  forgotPasswordText: {
    ...FONTS.body_semibold,
    color: COLORS.primary,
  },
  loginButton: {
    marginTop: SIZES.small,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.large,
  },
  registerText: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  registerLink: {
    ...FONTS.body_semibold,
    color: COLORS.primary,
  },
});

export default LoginScreen;
