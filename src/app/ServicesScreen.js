import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import ServiceCard from "../components/ServiceCard";
import initialServices from "../mockdata/services";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

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

  const CustomButton = ({ onPress, title, icon }) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={["#FFB6C1", "#FFC0CB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <MaterialIcons name={icon} size={24} color="#fff" />
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Үйлчилгээнүүд</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Үйлчилгээний нэр"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Үнэ ₮"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Үргэлжлэх хугацаа"
          value={duration}
          onChangeText={setDuration}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <CustomButton
          title="Шинэ үйлчилгээ нэмэх"
          onPress={handleAddService}
          icon="add-circle-outline"
        />
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceCard data={item} onDelete={() => handleDelete(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 20,
    fontFamily: "System",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    color: "#2C3E50",
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  list: {
    paddingBottom: 20,
  },
});
