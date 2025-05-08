import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: "Гоо сайхны төв",
    email: "beauty@example.com",
    phone: "99112233",
    description: "Салон үйлчилгээ 10+ жилийн туршлагатай.",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    console.log("Профайл хадгалагдлаа: ", profile);
    // mock хадгалалт, жинхэнэд backend-руу илгээх
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профайл засах</Text>

      <TextInput
        style={styles.input}
        value={profile.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Нэр"
      />
      <TextInput
        style={styles.input}
        value={profile.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Имэйл"
      />
      <TextInput
        style={styles.input}
        value={profile.phone}
        onChangeText={(text) => handleChange("phone", text)}
        placeholder="Утас"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={profile.description}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Тайлбар"
        multiline
      />

      <Button title="Хадгалах" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
});
