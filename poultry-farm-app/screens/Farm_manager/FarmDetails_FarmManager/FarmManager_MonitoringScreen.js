import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const monitoringData = [
    { id: '1', name: 'Block A', temperature: 24, ammoniaLevel: 20 },
    { id: '2', name: 'Block B', temperature: 25, ammoniaLevel: 18 },
    { id: '3', name: 'Block C', temperature: 26, ammoniaLevel: 22 },
];

const getPercentage = (value, max) => (value / max) * 100;

const MonitoringScreen = () => {
    const { theme } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            {monitoringData.map((block) => (
                <View key={block.id} style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                    <Text style={[styles.cardTitle, { color: theme.primary }]}>{block.name}</Text>

                    <View style={styles.detailRow}>
                        <Icon name="thermometer" size={20} color={theme.iconColor} style={styles.icon} />
                        <Text style={[styles.detailText, { color: theme.text }]}>Temperature: {block.temperature}°C</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${getPercentage(block.temperature, 40)}%`, backgroundColor: 'coral' }]} />
                    </View>

                    <View style={styles.detailRow}>
                        <Icon name="chemical-weapon" size={20} color={theme.iconColor} style={styles.icon} />
                        <Text style={[styles.detailText, { color: theme.text }]}>Ammonia Level: {block.ammoniaLevel} ppm</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${getPercentage(block.ammoniaLevel, 50)}%`, backgroundColor: 'darkorange' }]} />
                    </View>
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
    card: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
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
    progressBarContainer: {
        height: 20,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        borderRadius: 10,
    },
});

export default MonitoringScreen;
