import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function HomeStack() {
    const { theme } = useContext(ThemeContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerTintColor: theme.colors.text,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TodoList' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Task Details' }} />
        </Stack.Navigator>
    );
}
function TabNavigator() {
    const { theme } = useContext(ThemeContext);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarStyle: { backgroundColor: theme.colors.background },
            }}
        >
            <Tab.Screen name="Tasks" component={HomeStack} options={{
                headerShown:
                    false
            }} />
            <Tab.Screen name="Info" component={InfoScreen} options={{
                title:
                    'About'
            }} />
        </Tab.Navigator>
    );
}
function AppNavigator() {
    const { theme } = useContext(ThemeContext);
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerStyle: { backgroundColor: theme.colors.background },
                    drawerLabelStyle: { color: theme.colors.text },
                }}
            ><Drawer.Screen name="Main" component={TabNavigator} options={{
                title:
                    'Home'
            }} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator;