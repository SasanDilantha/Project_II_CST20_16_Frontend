import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const Vet_NotificationScreen = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const notifications = [
        { id: '1', message: t('vaccination_due') },
        { id: '2', message: t('medical_supplies_delivered') },
        { id: '3', message: t('health_inspection_scheduled') },
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
