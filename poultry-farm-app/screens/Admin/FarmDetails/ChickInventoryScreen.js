import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const chicks = [
  { id: '1', supplier: 'Supplier A', breed: 'Breed X', quantity: 150, cost: 'Rs.3000.00', purchaseDate: '2024-01-01', placementCode: 'PC001' },
  { id: '2', supplier: 'Supplier B', breed: 'Breed Y', quantity: 200, cost: 'Rs.5000.00', purchaseDate: '2024-01-05', placementCode: 'PC002' },
  { id: '3', supplier: 'Supplier A', breed: 'Breed Z', quantity: 250, cost: 'Rs.5000.00', purchaseDate: '2024-01-10', placementCode: 'PC003' },
  { id: '5', supplier: 'Supplier B', breed: 'Breed Y', quantity: 180, cost: 'Rs.4500.00', purchaseDate: '2024-01-20', placementCode: 'PC005' },
  { id: '4', supplier: 'Supplier C', breed: 'Breed X', quantity: 100, cost: 'Rs.3000.00', purchaseDate: '2024-01-15', placementCode: 'PC004' },
];

const ChickInventoryScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={chicks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
            <View style={styles.detailRow}>
              <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
              <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {item.supplier}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="bird" size={20} color={theme.iconColor} style={styles.icon} />
              <Text style={[styles.detailText, { color: theme.text }]}>Breed: {item.breed}</Text>
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
              <Text style={[styles.detailText, { color: theme.text }]}>Purchase Date: {item.purchaseDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="code-tags" size={20} color={theme.iconColor} style={styles.icon} />
              <Text style={[styles.detailText, { color: theme.text }]}>Placement Code: {item.placementCode}</Text>
            </View>
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

export default ChickInventoryScreen;
