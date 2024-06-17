import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';

const farms = [
  { id: 1, name: 'Farm 1', startedChickCount: 200, currentChickCount: 150, age: '6 months' },
  { id: 2, name: 'Farm 2', startedChickCount: 250, currentChickCount: 200, age: '8 months' },
  { id: 3, name: 'Farm 3', startedChickCount: 300, currentChickCount: 250, age: '10 months' },
];

const FarmDetailsScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {farms.map((farm) => (
        <TouchableOpacity key={farm.id} style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]} onPress={() => navigation.navigate('FarmDetail', { farm })}>
          <View style={styles.cardContent}>
            <Icon name="home" size={30} color={theme.primary} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: theme.text }]}>{farm.name}</Text>
              <Text style={{ color: theme.text }}>Started Chick Count: {farm.startedChickCount}</Text>
              <Text style={{ color: theme.text }}>Current Chick Count: {farm.currentChickCount}</Text>
              <Text style={{ color: theme.text }}>Age: {farm.age}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => { /* Navigate to Add Farm Screen */ }}>
        <Icon name="plus-circle" size={50} color={theme.primary} />
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default FarmDetailsScreen;
