import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { saveTodos, loadTodos } from '../utils/Storage';
import { scheduleNotification } from '../utils/Notifications';
const DetailsScreen = ({ route, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { todo } = route.params;
    const [title, setTitle] = useState(todo.title);
    const [reminder] = useState(todo.reminder);
    const updateTodo = async () => {
        const todos = await loadTodos();
        const updatedTodos = todos.map((item) =>
            item.id === todo.id ? { ...item, title, reminder } : item
        );
        await saveTodos(updatedTodos);
        scheduleNotification(title, reminder);
        navigation.goBack();
    };
    return (
        <View style={[styles.container, {
            backgroundColor:
                theme.colors.background
        }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Task
                Details</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={[styles.input, {
                    borderColor: theme.colors.border, color:
                        theme.colors.text
                }]}
            />
            <Text style={[styles.reminder, { color: theme.colors.text }]}>
                Reminder: {new Date(reminder).toLocaleString()}
            </Text>
            <TouchableOpacity
                style={[styles.save, { backgroundColor: theme.colors.primary }]}
                onPress={updateTodo}
            >
                <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    reminder: { fontSize: 16, marginBottom: 20 },
    button: { padding: 10, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
export default DetailsScreen;