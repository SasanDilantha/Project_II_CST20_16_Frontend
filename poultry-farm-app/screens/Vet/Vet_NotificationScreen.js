// screens/Vet/Vet_NotificationScreen.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const Vet_NotificationScreen = () => {
    const { theme } = useTheme();

    const notifications = [
        { id: '1', message: 'Vaccination due for chickens.' },
        { id: '2', message: 'Medical supplies delivered.' },
        { id: '3', message: 'Health inspection scheduled.' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.notification, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                        <Text style={[styles.notificationText, { color: theme.text }]}>{item.message}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    notification: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    notificationText: {
        fontSize: 16,
    },
});

export default Vet_NotificationScreen;
