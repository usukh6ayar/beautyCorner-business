import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import HomeScreen from "../app/HomeScreen";
import AppointmentsScreen from "../app/AppointmentsScreen";
import AvailabilityScreen from "../app/AvailabilityScreen";
import ServicesScreen from "../app/ServicesScreen";
import ProfileScreen from "../app/ProfileScreen";

import { COLORS } from "../theme";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Нүүр":
              iconName = "home";
              break;
            case "Захиалгууд":
              iconName = "calendar";
              break;
            case "Чөлөөт цаг":
              iconName = "clock";
              break;
            case "Үйлчилгээ":
              iconName = "scissors";
              break;
            case "Профайл":
              iconName = "user";
              break;
            default:
              iconName = "circle";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Нүүр" component={HomeScreen} />
      <Tab.Screen name="Захиалгууд" component={AppointmentsScreen} />
      <Tab.Screen name="Чөлөөт цаг" component={AvailabilityScreen} />
      <Tab.Screen name="Үйлчилгээ" component={ServicesScreen} />
      <Tab.Screen name="Профайл" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
