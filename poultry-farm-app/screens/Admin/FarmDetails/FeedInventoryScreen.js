import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

const feedInventory = [
  { 
    id: '1', 
    block: 'Block A', 
    type: 'Starter Feed', 
    quantity: '500 kg', 
    supplier: 'Supplier A', 
    cost: '$200' 
  },
  { 
    id: '2', 
    block: 'Block A', 
    type: 'Grower Feed', 
    quantity: '300 kg', 
    supplier: 'Supplier B', 
    cost: '$150' 
  },
  { 
    id: '3', 
    block: 'Block B', 
    type: 'Finisher Feed', 
    quantity: '200 kg', 
    supplier: 'Supplier C', 
    cost: '$100' 
  },
  { 
    id: '4', 
    block: 'Block B', 
    type: 'Starter Feed', 
    quantity: '400 kg', 
    supplier: 'Supplier A', 
    cost: '$180' 
  },
  { 
    id: '5', 
    block: 'Block C', 
    type: 'Grower Feed', 
    quantity: '350 kg', 
    supplier: 'Supplier B', 
    cost: '$175' 
  },
  { 
    id: '6', 
    block: 'Block C', 
    type: 'Finisher Feed', 
    quantity: '250 kg', 
    supplier: 'Supplier C', 
    cost: '$125' 
  },
];

const FeedInventoryScreen = () => {
  const { theme } = useTheme();
  
  const groupedFeedInventory = feedInventory.reduce((acc, item) => {
    (acc[item.block] = acc[item.block] || []).push(item);
    return acc;
  }, {});

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {Object.keys(groupedFeedInventory).map((block) => (
        <View key={block} style={styles.blockContainer}>
          <Text style={[styles.blockTitle, { color: theme.primary }]}>{block}</Text>
          {groupedFeedInventory[block].map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardText, { color: theme.text }]}>Type: {item.type}</Text>
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

export default FeedInventoryScreen;
