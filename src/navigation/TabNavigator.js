import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppointmentsScreen from "../app/AppointmentsScreen";
import ServicesScreen from "../app/ServicesScreen";
import AvailabilityScreen from "../app/AvailabilityScreen";
import ProfileScreen from "../app/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Appointments")
            iconName = focused ? "calendar" : "calendar-outline";
          else if (route.name === "Customers")
            iconName = focused ? "people" : "people-outline";
          else if (route.name === "Analytics")
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          height: 60,
          paddingBottom: 8,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
