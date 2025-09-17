import React, { useContext } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <View style={[styles.container, {
            backgroundColor:
                theme.colors.background
        }]}>
            <Text style={[styles.title, {
                color: theme.colors.text
            }]}>Settings</Text>
            <View style={styles.setting}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Dark
                    Mode</Text>
                <Switch
                    value={theme.isDarkMode}
                    onValueChange={toggleTheme}
                    thumbColor={theme.isDarkMode ? theme.colors.primary : '#fff'}
                    trackColor={{ false: '#767577', true: theme.colors.primary }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    setting: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: { fontSize: 18 },
});
export default SettingsScreen;