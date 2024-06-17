import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const FarmDetailScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { farm } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.detailCard, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>{farm.name}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Location: {farm.location}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Chickens: {farm.chickens}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Eggs per day: {farm.eggsPerDay}</Text>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('BlockDetails')}>
          <Icon name="view-dashboard-outline" size={30} color={theme.primary} style={styles.icon} />
          <Text style={[styles.cardText, { color: theme.text }]}>Block Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('Monitoring')}>
          <Icon name="monitor" size={30} color={theme.primary} style={styles.icon} />
          <Text style={[styles.cardText, { color: theme.text }]}>Monitoring</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('ChickInventory')}>
          <Icon name="bird" size={30} color={theme.primary} style={styles.icon} />
          <Text style={[styles.cardText, { color: theme.text }]}>Chick Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('FeedInventory')}>
          <Icon name="food-variant" size={30} color={theme.primary} style={styles.icon} />
          <Text style={[styles.cardText, { color: theme.text }]}>Feed Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('MedicalInventory')}>
          <Icon name="medical-bag" size={30} color={theme.primary} style={styles.icon} />
          <Text style={[styles.cardText, { color: theme.text }]}>Medical Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  detailCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    width: '48%',
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FarmDetailScreen;
