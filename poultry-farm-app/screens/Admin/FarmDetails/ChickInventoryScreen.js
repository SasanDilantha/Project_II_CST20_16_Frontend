import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const blocks = [
    {
        name: 'Block A',
        chicks: [
            { id: '1', supplier: 'Supplier A', breed: 'Breed X', quantity: 150, cost: 'Rs.3000.00', purchaseDate: '2024-01-01' },
        ],
    },
    {
        name: 'Block B',
        chicks: [
            { id: '2', supplier: 'Supplier B', breed: 'Breed Y', quantity: 200, cost: 'Rs.5000.00', purchaseDate: '2024-01-05' },
        ],
    },
    {
        name: 'Block C',
        chicks: [
            { id: '3', supplier: 'Supplier A', breed: 'Breed Z', quantity: 250, cost: 'Rs.5000.00', purchaseDate: '2024-01-10' },
        ],
    },
];

const ChickInventoryScreen = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const calculateAgeInDays = (purchaseDate) => {
        const currentDate = new Date();
        const purchaseDateObj = new Date(purchaseDate);
        const differenceInTime = currentDate.getTime() - purchaseDateObj.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            {blocks.map((block, index) => (
                <View key={index} style={[styles.blockCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                    <Text style={[styles.blockTitle, { color: theme.primary }]}>{block.name}</Text>
                    {block.chicks.map((chick) => (
                        <View key={chick.id} style={styles.chickDetails}>
                            <View style={styles.detailRow}>
                                <Icon name="bird" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('breed')}: {chick.breed}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('supplier')}: {chick.supplier}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('quantity')}: {chick.quantity}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('cost')}: {chick.cost}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('purchase_date')}: {chick.purchaseDate}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('age')}: {calculateAgeInDays(chick.purchaseDate)} {t('days')}</Text>
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
    chickDetails: {
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

export default ChickInventoryScreen;
