import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", email, password);
    // mock auth logic
    navigation.replace("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Нэвтрэх</Text>
      <TextInput
        style={styles.input}
        placeholder="Имэйл"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Нууц үг"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Нэвтрэх" onPress={handleLogin} />
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Бүртгүүлэх</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  link: { marginTop: 10, color: "#0066cc", textAlign: "center" },
});
