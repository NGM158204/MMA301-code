import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { ThemeContext } from '../context/ThemeContext';

const CustomDrawerContent = (props) => {
    const { theme } = useContext(ThemeContext);
    return (
        <DrawerContentScrollView {...props}>
            <View style={[styles.header, {
                backgroundColor:
                    theme.colors.background, borderBottomColor: theme.colors.border
            }]}>
                <Text style={[styles.headerText, {
                    color: theme.colors.primary
                }]}>Advanced To-do List</Text>
            </View>
            <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('Main')}
                labelStyle={[styles.label, { color: theme.colors.text }]}
            />
            <DrawerItem
                label="Settings"
                onPress={() => props.navigation.navigate('Settings')}
                labelStyle={[styles.label, { color: theme.colors.text }]}
            />
        </DrawerContentScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        padding: 20,
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
    },
});
export default CustomDrawerContent;