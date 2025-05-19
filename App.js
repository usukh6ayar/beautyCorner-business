import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import TabNavigator from "./src/navigation/TabNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "./src/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate checking for stored credentials
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Here you would normally check AsyncStorage or SecureStore for tokens
        // For demo purposes, we'll just simulate a successful login after a delay
        setTimeout(() => {
          setIsLoggedIn(true);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log("Error checking login status:", error);
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider initialState={{ isLoggedIn, setIsLoggedIn }}>
        <NavigationContainer>
          {isLoggedIn ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
