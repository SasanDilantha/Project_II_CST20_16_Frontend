import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const blockDetails = [
  { 
    id: '1', 
    name: 'Block A', 
    placementCode: 'PC001', 
    breed: 'Broiler', 
    numberOfChicks: 150, 
    age: '6 weeks', 
    inventoryCode: 'INV001', 
    estimatedFoodQuantity: '50kg' 
  },
  { 
    id: '2', 
    name: 'Block B', 
    placementCode: 'PC002', 
    breed: 'Layer', 
    numberOfChicks: 200, 
    age: '8 weeks', 
    inventoryCode: 'INV002', 
    estimatedFoodQuantity: '70kg' 
  },
  { 
    id: '3', 
    name: 'Block C', 
    placementCode: 'PC003', 
    breed: 'Broiler', 
    numberOfChicks: 250, 
    age: '10 weeks', 
    inventoryCode: 'INV003', 
    estimatedFoodQuantity: '90kg' 
  },
];

const BlockDetailsScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {blockDetails.map((block) => (
        <View key={block.id} style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>{block.name}</Text>
          <View style={styles.detailRow}>
            <Icon name="code-tags" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Placement Code: {block.placementCode}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="bird" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Breed: {block.breed}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="egg" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Number of Chicks: {block.numberOfChicks}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Age: {block.age}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="archive" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Inventory Code: {block.inventoryCode}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="food-apple" size={20} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.detailText, { color: theme.text }]}>Estimated Food Quantity: {block.estimatedFoodQuantity}</Text>
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
    fontSize: 22,
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
});

export default BlockDetailsScreen;
