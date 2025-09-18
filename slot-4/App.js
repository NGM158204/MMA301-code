import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// import 3 màn hình
import StylesheetDemo from "./screens/StylesheetDemo";
import FlexboxDemo from "./screens/FlexboxDemo";
import StyledComponentsDemo from "./screens/StyledComponentsDemo";

const Tab = createBottomTabNavigator();

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Stylesheets") {
              iconName = focused ? "color-palette" : "color-palette-outline";
            } else if (route.name === "Flexbox") {
              iconName = focused ? "grid" : "grid-outline";
            } else if (route.name === "Styled") {
              iconName = focused ? "code-slash" : "code-slash-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDark ? "#4ea8ff" : "#1e90ff",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDark ? "#111" : "#fff",
          },
        })}
      >
        <Tab.Screen name="Stylesheets" component={StylesheetDemo} />
        <Tab.Screen name="Flexbox" component={FlexboxDemo} />
        <Tab.Screen name="Styled" component={StyledComponentsDemo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
