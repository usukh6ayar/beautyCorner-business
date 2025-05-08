import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import AuthStack from "./navigation/AuthStack";

export default function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      <AuthStack />
    </NavigationContainer>
  );
}
