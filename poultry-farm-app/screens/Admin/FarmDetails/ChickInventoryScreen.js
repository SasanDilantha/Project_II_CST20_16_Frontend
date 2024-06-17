import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

const chicks = [
  { id: '1', age: '1 week', health: 'Healthy', vaccinated: 'Yes', supplier: 'Supplier A', cost: '$2.00', block: 'Block A', breed: 'Breed X' },
  { id: '2', age: '2 weeks', health: 'Healthy', vaccinated: 'Yes', supplier: 'Supplier B', cost: '$2.50', block: 'Block B', breed: 'Breed Y' },
  { id: '3', age: '3 weeks', health: 'Sick', vaccinated: 'No', supplier: 'Supplier A', cost: '$2.00', block: 'Block C', breed: 'Breed Z' },
  { id: '4', age: '4 weeks', health: 'Healthy', vaccinated: 'Yes', supplier: 'Supplier C', cost: '$3.00', block: 'Block A', breed: 'Breed X' },
  { id: '5', age: '5 weeks', health: 'Healthy', vaccinated: 'Yes', supplier: 'Supplier B', cost: '$2.50', block: 'Block B', breed: 'Breed Y' },
];

const ChickInventoryScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <FlatList
        data={chicks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.cardText, { color: theme.text }]}>Age: {item.age}</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>Health: {item.health}</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>Vaccinated: {item.vaccinated}</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>Supplier: {item.supplier}</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>Cost: {item.cost}</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>Block: {item.block}</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>Breed: {item.breed}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ChickInventoryScreen;
