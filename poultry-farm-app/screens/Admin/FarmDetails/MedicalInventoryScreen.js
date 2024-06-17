import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const medicalInventory = [
  { 
    id: '1', 
    supplier: 'Supplier A', 
    drug: 'Vaccine A', 
    quantity: '50 doses', 
    cost: 'Rs.1000', 
    date: '2024-01-01', 
    expireDate: '2024-06-01' 
  },
  { 
    id: '2', 
    supplier: 'Supplier B', 
    drug: 'Antibiotic B', 
    quantity: '100 doses', 
    cost: 'Rs.2000', 
    date: '2024-01-05', 
    expireDate: '2024-06-05' 
  },
  { 
    id: '3', 
    supplier: 'Supplier C', 
    drug: 'Vitamin C', 
    quantity: '200 doses', 
    cost: 'Rs.1500', 
    date: '2024-01-10', 
    expireDate: '2024-06-10' 
  },
  { 
    id: '4', 
    supplier: 'Supplier A', 
    drug: 'Vaccine B', 
    quantity: '60 doses', 
    cost: 'Rs.1200', 
    date: '2024-01-15', 
    expireDate: '2024-06-15' 
  },
  { 
    id: '5', 
    supplier: 'Supplier B', 
    drug: 'Antibiotic C', 
    quantity: '80 doses', 
    cost: 'Rs.1600', 
    date: '2024-01-20', 
    expireDate: '2024-06-20' 
  },
  { 
    id: '6', 
    supplier: 'Supplier C', 
    drug: 'Vitamin D', 
    quantity: '150 doses', 
    cost: 'Rs.1300', 
    date: '2024-01-25', 
    expireDate: '2024-06-25' 
  },
];

const MedicalInventoryScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {medicalInventory.map((item) => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
          <View style={styles.detailRow}>
            <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {item.supplier}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="pill" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Drug: {item.drug}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Quantity: {item.quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Cost: {item.cost}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Date: {item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Expire Date: {item.expireDate}</Text>
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

export default MedicalInventoryScreen;
