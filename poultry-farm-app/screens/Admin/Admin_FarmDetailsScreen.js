import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const initialFarms = [
  { id: 1, name: 'Farm 1', startedChickCount: 200, currentChickCount: 150, location: 'Location 1', blockCount: 5 },
  { id: 2, name: 'Farm 2', startedChickCount: 250, currentChickCount: 200, location: 'Location 2', blockCount: 7 },
  { id: 3, name: 'Farm 3', startedChickCount: 300, currentChickCount: 250, location: 'Location 3', blockCount: 6 },
];

const FarmDetailsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation(); // Initialize the translation hook
  const [farms, setFarms] = useState(initialFarms);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [password, setPassword] = useState('');
  const [farmDetails, setFarmDetails] = useState({
    name: '',
    location: '',
    blockCount: '',
    managerDetails: '',
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

  const handleAddFarm = () => {
    const newFarm = {
      id: farms.length + 1,
      name: farmDetails.name,
      startedChickCount: 0,
      currentChickCount: 0,
      location: farmDetails.location,
      blockCount: parseInt(farmDetails.blockCount, 10),
      managerDetails: farmDetails.managerDetails,
    };
    setFarms([...farms, newFarm]);
    setFarmDetails({
      name: '',
      location: '',
      blockCount: '',
      managerDetails: '',
    });
    setAddModalVisible(false);
  };

  const handleDeleteFarm = () => {
    if (password === 'admin') {
      toggleConfirmModal();
    } else {
      alert(t('incorrect_password'));
    }
  };

  const confirmDeleteFarm = () => {
    setFarms(farms.filter(farm => farm.id !== selectedFarm.id));
    setDeleteModalVisible(false);
    setConfirmModalVisible(false);
  };

  return (
      <View style={{ flex: 1 }}>
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
          {farms.map((farm) => (
              <TouchableOpacity
                  key={farm.id}
                  style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}
                  onPress={() => navigation.navigate('FarmDetail', { farm })}
              >
                <View style={styles.cardContent}>
                  <Icon name="home" size={30} color={theme.primary} style={styles.icon} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: theme.text }]}>{farm.name}</Text>
                    <Text style={{ color: theme.text }}>{t('started_chick_count')}: {farm.startedChickCount}</Text>
                    <Text style={{ color: theme.text }}>{t('remaining_chick_count')}: {farm.currentChickCount}</Text>
                    <Text style={{ color: theme.text }}>{t('location')}: {farm.location}</Text>
                    <Text style={{ color: theme.text }}>{t('block_count')}: {farm.blockCount}</Text>
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
        </ScrollView>

        {/* Add Farm Modal */}
        <Modal visible={isAddModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{t('add_farm')}</Text>
              <TextInput
                  placeholder={t('name')}
                  style={[styles.input, { color: theme.text }]}
                  onChangeText={(text) => setFarmDetails({ ...farmDetails, name: text })}
                  value={farmDetails.name}
              />
              <TextInput
                  placeholder={t('location')}
                  style={[styles.input, { color: theme.text }]}
                  onChangeText={(text) => setFarmDetails({ ...farmDetails, location: text })}
                  value={farmDetails.location}
              />
              <TextInput
                  placeholder={t('block_count')}
                  style={[styles.input, { color: theme.text }]}
                  keyboardType="numeric"
                  onChangeText={(text) => setFarmDetails({ ...farmDetails, blockCount: text })}
                  value={farmDetails.blockCount}
              />
              <TextInput
                  placeholder={t('manager_details')}
                  style={[styles.input, { color: theme.text }]}
                  onChangeText={(text) => setFarmDetails({ ...farmDetails, managerDetails: text })}
                  value={farmDetails.managerDetails}
              />
              <View style={styles.buttonContainer}>
                <Button title={t('cancel')} onPress={toggleAddModal} color={theme.primary} />
                <Button title={t('add')} onPress={handleAddFarm} color={theme.primary} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Farm Modal */}
        <Modal visible={isDeleteModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{t('delete_farm')}</Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                {t('delete_confirmation')} {selectedFarm?.name}?
              </Text>
              <TextInput
                  placeholder={t('password')}
                  style={[styles.input, { color: theme.text }]}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
              />
              <View style={styles.buttonContainer}>
                <Button title={t('cancel')} onPress={toggleDeleteModal} color={theme.primary} />
                <Button title={t('delete')} onPress={handleDeleteFarm} color={theme.primary} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Confirm Delete Modal */}
        <Modal visible={isConfirmModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{t('confirm_delete')}</Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                {t('farm_to_be_deleted')}: {selectedFarm?.name}
              </Text>
              <View style={styles.buttonContainer}>
                <Button title={t('cancel')} onPress={toggleConfirmModal} color={theme.primary} />
                <Button title={t('ok')} onPress={confirmDeleteFarm} color={theme.primary} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
