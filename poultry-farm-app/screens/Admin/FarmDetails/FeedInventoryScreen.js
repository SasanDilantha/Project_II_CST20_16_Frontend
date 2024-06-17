import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const feedInventory = [
  { 
    id: '1', 
    supplier: 'Supplier A', 
    type: 'Starter Feed', 
    quantity: '500 kg', 
    cost: 'Rs.20000', 
    date: '2024-01-01', 
    expireDate: '2024-06-01' 
  },
  { 
    id: '2', 
    supplier: 'Supplier B', 
    type: 'Grower Feed', 
    quantity: '300 kg', 
    cost: 'Rs.15000', 
    date: '2024-01-05', 
    expireDate: '2024-06-05' 
  },
  { 
    id: '3', 
    supplier: 'Supplier C', 
    type: 'Finisher Feed', 
    quantity: '200 kg', 
    cost: 'Rs.10000', 
    date: '2024-01-10', 
    expireDate: '2024-06-10' 
  },
  { 
    id: '4', 
    supplier: 'Supplier A', 
    type: 'Starter Feed', 
    quantity: '400 kg', 
    cost: 'Rs.18000', 
    date: '2024-01-15', 
    expireDate: '2024-06-15' 
  },
  { 
    id: '5', 
    supplier: 'Supplier B', 
    type: 'Grower Feed', 
    quantity: '350 kg', 
    cost: 'Rs.17500', 
    date: '2024-01-20', 
    expireDate: '2024-06-20' 
  },
  { 
    id: '6', 
    supplier: 'Supplier C', 
    type: 'Finisher Feed', 
    quantity: '250 kg', 
    cost: 'Rs.12500', 
    date: '2024-01-25', 
    expireDate: '2024-06-25' 
  },
];

const FeedInventoryScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {feedInventory.map((item) => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
          <View style={styles.detailRow}>
            <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {item.supplier}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="food-apple" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Type: {item.type}</Text>
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

export default FeedInventoryScreen;
