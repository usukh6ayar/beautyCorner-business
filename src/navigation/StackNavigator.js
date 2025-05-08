import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentsScreen from "../app/AppointmentsScreen";
import ServicesScreen from "../app/ServicesScreen";
import AvailabilityScreen from "../app/AvailabilityScreen";
import ProfileScreen from "../app/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Appointments">
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Availability" component={AvailabilityScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
