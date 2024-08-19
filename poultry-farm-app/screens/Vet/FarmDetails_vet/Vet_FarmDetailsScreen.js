// screens/Vet/FarmDetails_vet/Vet_FarmDetailsScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';

const Vet_FarmDetailsScreen = ({ navigation }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.cardsContainer}>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: theme.cardBackground }]}
                    onPress={() => navigation.navigate('VetMedicalInventory')}
                >
                    <MaterialIcons name="healing" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>Medical Inventory</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: theme.cardBackground }]}
                    onPress={() => navigation.navigate('VetRecommendMedicine')}
                >
                    <MaterialIcons name="assignment" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>Recommend Medicine</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    cardText: {
        marginTop: 8,
        fontSize: 16,
    },
});

export default Vet_FarmDetailsScreen;
