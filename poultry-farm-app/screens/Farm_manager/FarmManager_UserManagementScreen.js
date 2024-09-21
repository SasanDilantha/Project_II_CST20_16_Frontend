import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Modal, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';

const FarmManager_UserManagementScreen = () => {
    const { theme } = useTheme();
    const [employees, setEmployees] = useState([
        { id: '1', name: 'John Doe', position: 'Farm Manager', email: 'john@example.com', phone: '1234567890', address: '123 Farm Road', farm: 'Happy Farm', works: 'Supervising', salary: 5000, role: 'Farm Manager' },
        { id: '2', name: 'Jane Smith', position: 'Farm Worker', email: 'jane@example.com', phone: '0987654321', address: '456 Farm Lane', farm: 'Happy Farm', works: 'Feeding', salary: 3000, role: 'Farm Employee' },
        { id: '3', name: 'Sam Green', position: 'Veterinarian', email: 'sam@example.com', phone: '1112223333', address: '789 Farm Street', farm: 'Sunshine Farm', works: 'Animal Health', salary: 4500, role: 'Veterinarian' },
        { id: '4', name: 'Emily White', position: 'Farm Worker', email: 'emily@example.com', phone: '4445556666', address: '101 Farm Blvd', farm: 'Sunshine Farm', works: 'Maintenance', salary: 2800, role: 'Farm Employee' },
        { id: '5', name: 'Michael Brown', position: 'Accountant', email: 'michael@example.com', phone: '7778889999', address: '102 Farm Rd', farm: 'Happy Farm', works: 'Finance', salary: 4000, role: 'Accountant' },
        { id: '6', name: 'Linda Blue', position: 'Farm Worker', email: 'linda@example.com', phone: '1122334455', address: '103 Farm St', farm: 'Happy Farm', works: 'Harvesting', salary: 2900, role: 'Farm Employee' },
    ]);

    const farmName = 'Happy Farm';

    const filteredEmployees = employees.filter(employee => employee.farm === farmName);

    const renderEmployee = ({ item }) => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Icon name="account" size={24} color={theme.primary} style={styles.icon} />
            <View style={styles.cardContent}>
                <Text style={[styles.cardText, { color: theme.text }]}>Name: {item.name}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Position: {item.position}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Email: {item.email}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Phone: {item.phone}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Address: {item.address}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Farm: {item.farm}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Works: {item.works}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Salary: Rs.{item.salary}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>Role: {item.role}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.message, { color: theme.text }]}>User Management for {farmName}</Text>

            <FlatList
                data={filteredEmployees}
                renderItem={renderEmployee}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.section}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    message: {
        fontSize: 18,
        marginBottom: 16,
    },
    section: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default FarmManager_UserManagementScreen;
