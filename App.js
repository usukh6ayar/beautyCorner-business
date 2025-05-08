import { NavigationContainer } from "@react-navigation/native";
import AuthStack, { AuthProvider } from "./src/navigation/AuthStack";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
