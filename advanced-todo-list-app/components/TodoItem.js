import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
const TodoItem = React.memo(({ item, onPress, onDelete, onToggle }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            style={[styles.item, {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border
            }]}
            onPress={onPress}
        >
            <Text style={[styles.title, {
                color: theme.colors.text,
                textDecorationLine: item.completed ? 'line-through' : 'none'
            }]}>
                {item.title}
            </Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onToggle}>
                    <Text style={[styles.actionText, {
                        color: item.completed ? 'green'
                            : theme.colors.primary
                    }]}>
                        {item.completed ? 'Undo' : 'Done'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={[styles.actionText, { color: 'red' }]}>X</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
});
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default TodoItem;