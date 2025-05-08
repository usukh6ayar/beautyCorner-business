import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppointmentsScreen from "../app/AppointmentsScreen";
import ServicesScreen from "../app/ServicesScreen";
import AvailabilityScreen from "../app/AvailabilityScreen";
import ProfileScreen from "../app/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Availability" component={AvailabilityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
