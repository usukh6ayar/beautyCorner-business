import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // mock login

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
