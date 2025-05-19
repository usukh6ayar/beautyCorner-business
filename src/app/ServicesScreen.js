import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceCard from "../components/ServiceCard";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import initialServices from "../mockdata/services";
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from "../theme";

const { width } = Dimensions.get("window");

export default function ServicesScreen({ navigation }) {
  const [services, setServices] = useState(initialServices);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const handleAddService = () => {
    if (!name || !price || !duration || !category) {
      Alert.alert("Бүх талбарыг бөглөнө үү.");
      return;
    }
    const newService = {
      id: Date.now(),
      name,
      price: parseInt(price),
      duration,
      category,
    };
    setServices([...services, newService]);
    setName("");
    setPrice("");
    setDuration("");
    setCategory("");
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleEdit = (id) => {
    navigation.navigate("EditServiceScreen", { serviceId: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Үйлчилгээнүүд"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightIcon="plus"
        onRightPress={() => navigation.navigate("AddServiceScreen")}
      />
      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Шинэ үйлчилгээ нэмэх</Text>
        <TextInput
          placeholder="Үйлчилгээний нэр"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel="Үйлчилгээний нэр"
        />
        <TextInput
          placeholder="Ангилал (жишээ: Үсний засалт)"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel="Үйлчилгээний ангилал"
        />
        <TextInput
          placeholder="Үнэ (₮)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel="Үйлчилгээний үнэ"
        />
        <TextInput
          placeholder="Үргэлжлэх хугацаа (жишээ: 1 цаг)"
          value={duration}
          onChangeText={setDuration}
          style={styles.input}
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel="Үйлчилгээний хугацаа"
        />
        <Button
          title="Нэмэх"
          variant="gradient"
          size="large"
          leftIcon="plus-circle"
          fullWidth
          onPress={handleAddService}
          style={styles.addButton}
        />
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceCard
            data={item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item.id)}
            onPress={() =>
              navigation.navigate("ServiceDetailsScreen", {
                serviceId: item.id,
              })
            }
          />
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
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.m,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginVertical: SPACING.m,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  input: {
    ...FONTS.body,
    borderWidth: 1,
    borderColor: COLORS.accent,
    padding: SPACING.s,
    borderRadius: SIZES.radius_small,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.m,
    height: 50,
  },
  addButton: {
    marginTop: SPACING.s,
  },
  list: {
    paddingBottom: SPACING.xl,
  },
});
