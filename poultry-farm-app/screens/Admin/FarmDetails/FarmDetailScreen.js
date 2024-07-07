import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const FarmDetailScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { farm } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const sampleData = {
    farmManager: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      contactNumber: '123-456-7890',
    },
    totalEmployees: 15,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.detailCard, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>{farm.farm_name}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Location: {farm.location}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Started Chick Count: {farm.begin_inventory_count}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Current Chick Count: {farm.available_inventory_count}</Text>
        <Text style={[styles.detailText, { color: theme.text }]}>Age: {farm.chick_age} Days</Text>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#757575',
  },
  saveButton: {},
  deleteButton: {},
});

export default FarmDetailScreen;
