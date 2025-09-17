import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList,
    TextInput,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import TodoItem from '../components/TodoItem';
import { saveTodos, loadTodos } from '../utils/Storage';
import { scheduleNotification } from '../utils/Notifications';
const HomeScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        const init = async () => {
            const loadedTodos = await loadTodos();
            setTodos(loadedTodos);
        };
        init();
    }, []);
    useEffect(() => {
        saveTodos(todos);
    }, [todos]);
    const addTodo = () => {
        if (title.trim()) {
            const newTodo = {
                id: Date.now().toString(),
                title,
                completed: false,
                reminder: new Date(Date.now() + 60000), // Reminder in 1 minute for
                demo
            };
            setTodos([...todos, newTodo]);
            scheduleNotification(title, newTodo.reminder);
            setTitle('');
        }
    };
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, {
                backgroundColor: theme.colors.background
            }]}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter task"
                    placeholderTextColor={theme.colors.text}
                    value={title}
                    onChangeText={setTitle}
                    style={[styles.input, {
                        borderColor: theme.colors.border, color:
                            theme.colors.text
                    }]}
                />
                <TouchableOpacity style={[styles.addButton, {
                    backgroundColor:
                        theme.colors.primary
                }]} onPress={addTodo}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem
                        item={item}
                        onPress={() => navigation.navigate('Details', { todo: item })}
                        onDelete={() => deleteTodo(item.id)}
                        onToggle={() => toggleTodo(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    inputContainer: { flexDirection: 'row', marginBottom: 10 },
    input: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    addButton: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default HomeScreen;