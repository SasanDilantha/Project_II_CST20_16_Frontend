import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';
import { getAllFarmDetails } from '../../services/farmService';
import axios from 'axios';
import {
  ADD_FARM
} from '@env';

const FarmDetailsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [farms, setFarms] = useState([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [password, setPassword] = useState('');
  const [farmDetails, setFarmDetails] = useState({
    name: '',
    location: '',
  });

  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };

  const toggleDeleteModal = (farm) => {
    setSelectedFarm(farm);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleConfirmModal = () => {
    setConfirmModalVisible(!isConfirmModalVisible);
  };

  const handleAddFarm = async () => {
    try {
      const response = await axios.post(ADD_FARM, farmDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Farm added successfully:', response.data);
      // Update the farms state with the newly added farm
      setFarms([...farms, response.data]);
      // Reset farm details and close modal
      setFarmDetails({
        name: '',
        location: '',
      });
      setAddModalVisible(false);
    } catch (error) {
      console.error('Error adding farm:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleDeleteFarm = () => {
    if (password === 'your_password') {
      toggleConfirmModal();
    } else {
      alert('Incorrect password');
    }
  };

  const confirmDeleteFarm = () => {
    setFarms(farms.filter(farm => farm.id !== selectedFarm.id));
    setDeleteModalVisible(false);
    setConfirmModalVisible(false);
  };

  useEffect(() => {
    const getFarm = async () => {
      try {
        const farmDetails = await getAllFarmDetails();
        setFarms(farmDetails);
        console.log(farmDetails);
      } catch (err) {
        setError(err);
      }
    };
    getFarm();
  }, []);

  return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {farms.map((farm) => (
            <TouchableOpacity
                key={farm.farm_id}
                style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}
                onPress={() => navigation.navigate('FarmDetail', { farm })}
            >
              <View style={styles.cardContent}>
                <Icon name="home" size={30} color={theme.primary} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={[styles.title, { color: theme.text }]}>{farm.farm_name}</Text>
                  <Text style={{ color: theme.text }}>Started Chick Count: {farm.begin_inventory_count}</Text>
                  <Text style={{ color: theme.text }}>Remaining Chick Count: {farm.available_inventory_count}</Text>
                  <Text style={{ color: theme.text }}>Location: {farm.location}</Text>
                  <Text style={{ color: theme.text }}>Chick Age: {farm.chick_age}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleDeleteModal(farm)}>
                  <Icon name="delete" size={30} color={theme.primary} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={toggleAddModal}>
          <Icon name="plus-circle" size={50} color={theme.primary} />
        </TouchableOpacity>

        {/* Add Farm Modal */}
        <Modal visible={isAddModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Add Farm</Text>
              <TextInput
                  placeholder="Name"
                  style={[styles.input, { color: theme.text }]}
                  onChangeText={(text) => setFarmDetails({ ...farmDetails, name: text })}
                  value={farmDetails.name}
              />
              <TextInput
                  placeholder="Location"
                  style={[styles.input, { color: theme.text }]}
                  onChangeText={(text) => setFarmDetails({ ...farmDetails, location: text })}
                  value={farmDetails.location}
              />
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={toggleAddModal} color={theme.primary} />
                <Button title="Add" onPress={handleAddFarm} color={theme.primary} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Farm Modal */}
        <Modal visible={isDeleteModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Delete Farm</Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                Are you sure you want to delete {selectedFarm?.name}?
              </Text>
              <TextInput
                  placeholder="Password"
                  style={[styles.input, { color: theme.text }]}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
              />
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={toggleDeleteModal} color={theme.primary} />
                <Button title="Delete" onPress={handleDeleteFarm} color={theme.primary} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Confirm Delete Modal */}
        <Modal visible={isConfirmModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Confirm Delete</Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                The following farm will be deleted: {selectedFarm?.name}
              </Text>
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={toggleConfirmModal} color={theme.primary} />
                <Button title="OK" onPress={confirmDeleteFarm} color={theme.primary} />
              </View>
            </View>
          </View>
        </Modal>
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
    flex: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    marginLeft: 16,
  },
});

export default FarmDetailsScreen;
