import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../app/HomeScreen";
import AppointmentsScreen from "../app/AppointmentsScreen";
import ServicesScreen from "../app/ServicesScreen";
import ProfileScreen from "../app/ProfileScreen";
import AvailabilityScreen from "../app/AvailabilityScreen";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../theme";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Appointments") iconName = "calendar";
          else if (route.name === "Services") iconName = "scissors";
          else if (route.name === "Availability") iconName = "clock";
          else if (route.name === "Profile") iconName = "user";
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text_secondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.accent,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Нүүр" }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ title: "Захиалгууд" }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ title: "Үйлчилгээ" }}
      />
      <Tab.Screen
        name="Availability"
        component={AvailabilityScreen}
        options={{ title: "Хуваарь" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Профайл" }}
      />
    </Tab.Navigator>
  );
}
