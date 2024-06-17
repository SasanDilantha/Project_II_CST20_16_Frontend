import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

const monitoringData = [
  { 
    id: '1', 
    name: 'Block A', 
    feedConsumption: '50 kg', 
    waterConsumption: '100 liters', 
    temperature: '24°C', 
    humidity: '65%', 
    ammoniaLevel: '20 ppm' 
  },
  { 
    id: '2', 
    name: 'Block B', 
    feedConsumption: '70 kg', 
    waterConsumption: '150 liters', 
    temperature: '25°C', 
    humidity: '60%', 
    ammoniaLevel: '18 ppm' 
  },
  { 
    id: '3', 
    name: 'Block C', 
    feedConsumption: '90 kg', 
    waterConsumption: '200 liters', 
    temperature: '26°C', 
    humidity: '55%', 
    ammoniaLevel: '22 ppm' 
  },
];

const MonitoringScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {monitoringData.map((block) => (
        <View key={block.id} style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>{block.name}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Feed Consumption: {block.feedConsumption}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Water Consumption: {block.waterConsumption}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Temperature: {block.temperature}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Humidity: {block.humidity}</Text>
          <Text style={[styles.detailText, { color: theme.text }]}>Ammonia Level: {block.ammoniaLevel}</Text>
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

export default MonitoringScreen;
