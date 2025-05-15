// src/components/AppointmentCard.js

import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../theme";

const AppointmentCard = ({ appointment, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { id, clientName, serviceName, date, time, price, status } =
    appointment;

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return COLORS.success;
      case "pending":
        return COLORS.warning;
      case "cancelled":
        return COLORS.danger;
      default:
        return COLORS.gray;
    }
  };

  const handleComplete = () => {
    setModalVisible(false);
    onUpdate && onUpdate(id, "completed");
  };

  const handleCancel = () => {
    Alert.alert("Цуцлах уу?", "Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?", [
      { text: "Үгүй", style: "cancel" },
      {
        text: "Тийм",
        onPress: () => {
          setModalVisible(false);
          onUpdate && onUpdate(id, "cancelled");
        },
      },
    ]);
  };

  const renderRightActions = () => (
    <View style={styles.actions}>
      <Pressable
        style={[styles.actionBtn, { backgroundColor: COLORS.success }]}
        onPress={handleComplete}
      >
        <Text style={styles.actionText}>Хийсэн</Text>
      </Pressable>
      <Pressable
        style={[styles.actionBtn, { backgroundColor: COLORS.danger }]}
        onPress={handleCancel}
      >
        <Text style={styles.actionText}>Цуцлах</Text>
      </Pressable>
    </View>
  );

  return (
    <>
      <Swipeable renderRightActions={renderRightActions}>
        <Pressable style={styles.card} onPress={() => setModalVisible(true)}>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>{clientName}</Text>
            <Text style={[styles.status, { color: getStatusColor(status) }]}>
              {status}
            </Text>
          </View>
          <Text style={styles.service}>
            {serviceName} - {price}₮
          </Text>
          <View style={styles.row}>
            <Feather name="calendar" size={14} color={COLORS.gray} />
            <Text style={styles.date}>{date}</Text>
            <Feather
              name="clock"
              size={14}
              color={COLORS.gray}
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.date}>{time}</Text>
          </View>
        </Pressable>
      </Swipeable>

      {/* Modal дэлгэрэнгүй */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Захиалгын дэлгэрэнгүй</Text>
            <Text>👤 {clientName}</Text>
            <Text>💇 Үйлчилгээ: {serviceName}</Text>
            <Text>📅 Огноо: {date}</Text>
            <Text>🕒 Цаг: {time}</Text>
            <Text>💰 Үнэ: {price}₮</Text>
            <Text>📌 Төлөв: {status}</Text>

            <View style={{ marginTop: 20 }}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: COLORS.success }]}
                onPress={handleComplete}
              >
                <Text style={styles.modalBtnText}>Хийсэн</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: COLORS.danger }]}
                onPress={handleCancel}
              >
                <Text style={styles.modalBtnText}>Цуцлах</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalBtnText, { color: COLORS.primary }]}>
                  Хаах
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  service: {
    marginVertical: 6,
    fontSize: 14,
    color: COLORS.gray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    marginLeft: 4,
    color: COLORS.gray,
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  actionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
