// screens/Vet/FarmDetails_vet/Vet_MedicalInventoryScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

// Example data grouped by blocks
const blocks = [
    {
        name: 'Block A',
        medicals: [
            { id: '1', supplier: 'Supplier A', drug: 'Vaccine A', quantity: '50 doses', cost: 'Rs.1000', date: '2024-01-01', expireDate: '2024-06-01' },
            // Add more medicals if needed
        ],
    },
    {
        name: 'Block B',
        medicals: [
            { id: '2', supplier: 'Supplier B', drug: 'Antibiotic B', quantity: '100 doses', cost: 'Rs.2000', date: '2024-01-05', expireDate: '2024-06-05' },
            // Add more medicals if needed
        ],
    },
    {
        name: 'Block C',
        medicals: [
            { id: '3', supplier: 'Supplier C', drug: 'Vitamin C', quantity: '200 doses', cost: 'Rs.1500', date: '2024-01-10', expireDate: '2024-06-10' },
            // Add more medicals if needed
        ],
    },
];

const Vet_MedicalInventoryScreen = () => {
    const { theme } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            {blocks.map((block, index) => (
                <View key={index} style={[styles.blockCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                    <Text style={[styles.blockTitle, { color: theme.primary }]}>{block.name}</Text>
                    {block.medicals.map((medical) => (
                        <View key={medical.id} style={styles.medicalDetails}>
                            <View style={styles.detailRow}>
                                <Icon name="pill" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Drug: {medical.drug}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {medical.supplier}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Quantity: {medical.quantity}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Cost: {medical.cost}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Purchase Date: {medical.date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Expire Date: {medical.expireDate}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    blockCard: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    blockTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    medicalDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    detailText: {
        fontSize: 16,
    },
});

export default Vet_MedicalInventoryScreen;
