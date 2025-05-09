import { NavigationContainer } from "@react-navigation/native";
import AuthStack, { AuthProvider } from "./src/navigation/AuthStack";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
        {/* <TabNavigator /> */}
      </NavigationContainer>
    </AuthProvider>
  );
}
