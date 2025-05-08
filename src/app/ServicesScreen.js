import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import ServiceCard from "../components/ServiceCard";
import initialServices from "../mockdata/services";

export default function ServicesScreen() {
  const [services, setServices] = useState(initialServices);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleAddService = () => {
    if (!name || !price || !duration)
      return Alert.alert("Бүх талбарыг бөглөнө үү.");
    const newService = {
      id: Date.now(),
      name,
      price: parseInt(price),
      duration,
    };
    setServices([...services, newService]);
    setName("");
    setPrice("");
    setDuration("");
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Үйлчилгээ</Text>

      <TextInput
        placeholder="Нэр"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Үнэ"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Хугацаа (жишээ нь: 30 мин)"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />
      <Button title="Нэмэх" onPress={handleAddService} />

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceCard data={item} onDelete={() => handleDelete(item.id)} />
        )}
        style={{ marginTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
});
