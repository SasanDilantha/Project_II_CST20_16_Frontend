import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

const medicalInventory = [
  { 
    id: '1', 
    block: 'Block A', 
    name: 'Vaccine A', 
    quantity: '50 doses', 
    supplier: 'Supplier A', 
    cost: '$100' 
  },
  { 
    id: '2', 
    block: 'Block A', 
    name: 'Antibiotic B', 
    quantity: '100 doses', 
    supplier: 'Supplier B', 
    cost: '$200' 
  },
  { 
    id: '3', 
    block: 'Block B', 
    name: 'Vitamin C', 
    quantity: '200 doses', 
    supplier: 'Supplier C', 
    cost: '$150' 
  },
  { 
    id: '4', 
    block: 'Block B', 
    name: 'Vaccine B', 
    quantity: '60 doses', 
    supplier: 'Supplier A', 
    cost: '$120' 
  },
  { 
    id: '5', 
    block: 'Block C', 
    name: 'Antibiotic C', 
    quantity: '80 doses', 
    supplier: 'Supplier B', 
    cost: '$160' 
  },
  { 
    id: '6', 
    block: 'Block C', 
    name: 'Vitamin D', 
    quantity: '150 doses', 
    supplier: 'Supplier C', 
    cost: '$130' 
  },
];

const MedicalInventoryScreen = () => {
  const { theme } = useTheme();

  const groupedMedicalInventory = medicalInventory.reduce((acc, item) => {
    (acc[item.block] = acc[item.block] || []).push(item);
    return acc;
  }, {});

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {Object.keys(groupedMedicalInventory).map((block) => (
        <View key={block} style={styles.blockContainer}>
          <Text style={[styles.blockTitle, { color: theme.primary }]}>{block}</Text>
          {groupedMedicalInventory[block].map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardText, { color: theme.text }]}>Name: {item.name}</Text>
              <Text style={[styles.cardText, { color: theme.text }]}>Quantity: {item.quantity}</Text>
              <Text style={[styles.cardText, { color: theme.text }]}>Supplier: {item.supplier}</Text>
              <Text style={[styles.cardText, { color: theme.text }]}>Cost: {item.cost}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  blockContainer: {
    marginBottom: 16,
  },
  blockTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default MedicalInventoryScreen;
