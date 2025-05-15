// src/components/StatCard.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const StatCard = ({ title, value, icon, color }) => (
  <View style={[styles.card, { backgroundColor: color + "20" }]}>
    <Feather name={icon} size={24} color={color} />
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default StatCard;

const styles = StyleSheet.create({
  card: {
    width: "47%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 6,
  },
  title: {
    fontSize: 14,
    color: "#555",
  },
});
