import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

const blockDetails = [
  { 
    id: '1', 
    name: 'Block A', 
    chickens: 150, 
    eggsPerDay: 120, 
    mortalityRate: '2%', 
    healthStatus: 'Good' 
  },
  { 
    id: '2', 
    name: 'Block B', 
    chickens: 200, 
    eggsPerDay: 180, 
    mortalityRate: '1.5%', 
    healthStatus: 'Good' 
  },
  { 
    id: '3', 
    name: 'Block C', 
    chickens: 250, 
    eggsPerDay: 220, 
    mortalityRate: '2.5%', 
    healthStatus: 'Fair' 
  },
];

const BlockDetailsScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {blockDetails.map((block) => (
        <View key={block.id} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{block.name}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Chickens: {block.chickens}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Eggs per day: {block.eggsPerDay}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Mortality Rate: {block.mortalityRate}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Health Status: {block.healthStatus}</Text>
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
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default BlockDetailsScreen;
