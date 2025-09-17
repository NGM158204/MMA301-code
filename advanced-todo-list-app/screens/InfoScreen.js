import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const InfoScreen = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[styles.container, {
            backgroundColor:
                theme.colors.background
        }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>About
                Advanced To-do List App</Text>
            <Text style={[styles.content, { color: theme.colors.text }]}>
                A task management app with reminders, dark mode, and local storage.
                Built with React Native and Expo.
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    content: { fontSize: 18 },
});
export default InfoScreen;