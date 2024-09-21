// screens/Vet/Vet_FarmListScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';

const Vet_FarmListScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const farms = [
        { id: '1', name: 'Farm A', location: 'Location A', chickens: 1200 },
        { id: '2', name: 'Farm B', location: 'Location B', chickens: 1500 },
        { id: '3', name: 'Farm C', location: 'Location C', chickens: 1100 },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={farms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: theme.cardBackground }]}
                        onPress={() => navigation.navigate('VetFarmDetails', { farm: item })}
                    >
                        <MaterialIcons name="home" size={40} color={theme.primary} />
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.name}</Text>
                            <Text style={[styles.cardText, { color: theme.text }]}>Location: {item.location}</Text>
                            <Text style={[styles.cardText, { color: theme.text }]}>Chickens: {item.chickens}</Text>
                        </View>
                    </TouchableOpacity>
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
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    cardContent: {
        marginLeft: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 16,
    },
});

export default Vet_FarmListScreen;
