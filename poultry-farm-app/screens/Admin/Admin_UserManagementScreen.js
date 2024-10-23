import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Modal, Alert, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../../theme/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

const UserManagementScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: ('happy farm'), value: 'Happy Farm' },
    { label: ('sunshine farm'), value: 'Sunshine Farm' }
  ]);

  const [employees, setEmployees] = useState([
    { id: '1', name: 'John Doe', position: 'Farm Manager', email: 'john@example.com', phone: '1234567890', address: '123 Farm Road', farm: 'Happy Farm', works: 'Supervising', salary: 5000, role: 'Farm Manager', profilePicture: null, username: 'johndoe', password: 'password123' },
    { id: '2', name: 'Jane Smith', position: 'Farm Worker', email: 'jane@example.com', phone: '0987654321', address: '456 Farm Lane', farm: 'Happy Farm', works: 'Feeding', salary: 3000, role: 'Farm Employee', profilePicture: null, username: 'janesmith', password: 'password123' },
    { id: '3', name: 'Sam Green', position: 'Veterinarian', email: 'sam@example.com', phone: '1112223333', address: '789 Farm Street', farm: 'Sunshine Farm', works: 'Animal Health', salary: 4500, role: 'Veterinarian', profilePicture: null, username: 'samgreen', password: 'password123' },
    { id: '4', name: 'Emily White', position: 'Farm Worker', email: 'emily@example.com', phone: '4445556666', address: '101 Farm Blvd', farm: 'Sunshine Farm', works: 'Maintenance', salary: 2800, role: 'Farm Employee', profilePicture: null, username: 'emilywhite', password: 'password123' },
    { id: '5', name: 'Michael Brown', position: 'Accountant', email: 'michael@example.com', phone: '7778889999', address: '102 Farm Rd', farm: 'Happy Farm', works: 'Finance', salary: 4000, role: 'Accountant', profilePicture: null, username: 'michaelbrown', password: 'password123' },
    { id: '6', name: 'Linda Blue', position: 'Farm Worker', email: 'linda@example.com', phone: '1122334455', address: '103 Farm St', farm: 'Happy Farm', works: 'Harvesting', salary: 2900, role: 'Farm Employee', profilePicture: null, username: 'lindablue', password: 'password123' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [profilePictureToView, setProfilePictureToView] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null); // For viewing employee details
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    farm: '',
    works: '',
    salary: '',
    role: 'Farm Employee',
    profilePicture: null,
    username: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);



  const handleAddEmployee = () => {
    if (
        !newEmployee.name ||
        !newEmployee.position ||
        !newEmployee.email ||
        !newEmployee.phone ||
        !newEmployee.address ||
        !newEmployee.farm ||
        !newEmployee.works ||
        !newEmployee.salary ||
        !newEmployee.username ||
        !newEmployee.password
    ) {
      Alert.alert(t('error'), t('fill_all_fields'));
      return;
    }
    if (isEditing) {
      setEmployees(employees.map(employee => employee.id === editEmployeeId ? { ...newEmployee, id: editEmployeeId } : employee));
      setIsEditing(false);
      setEditEmployeeId(null);
    } else {
      setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
    }
    setNewEmployee({
      name: '',
      position: '',
      email: '',
      phone: '',
      address: '',
      farm: '',
      works: '',
      salary: '',
      role: 'Farm Employee',
      profilePicture: null,
      username: '',
      password: ''
    });
    setModalVisible(false);
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee(employee);
    setEditEmployeeId(employee.id);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDeleteEmployee = () => {
    if (password === 'adminPassword') {
      setEmployees(employees.filter(employee => employee.id !== employeeToDelete.id));
      setDeleteModalVisible(false);
    } else {
      Alert.alert(t('error'), t('incorrect_password'));
    }
    setPassword('');
  };

  const confirmDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalVisible(true);
  };

  const selectProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(t('permission_required'));
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setNewEmployee({ ...newEmployee, profilePicture: { uri: pickerResult.uri } });
    }
  };

  const takeProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(t('permission_required'));
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setNewEmployee({ ...newEmployee, profilePicture: { uri: pickerResult.uri } });
    }
  };

  const openCallConfirmation = (phoneNumber) => {
    setSelectedPhoneNumber(phoneNumber);
    setCallModalVisible(true);
  };

  const renderEmployee = ({ item }) => (
      <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => { setProfilePictureToView(item.profilePicture); setProfileModalVisible(true); }}>
          <Image source={item.profilePicture ? { uri: item.profilePicture.uri } : require('../../assets/default-profile.png')} style={styles.profilePicture} />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{t('name')}:</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>{item.name}</Text>
          </View>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardLabel, { color: theme.text }]}>{t('position')}:</Text>
            <Text style={[styles.cardText, { color: theme.text }]}>{item.position}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => { setViewEmployee(item); setDetailsModalVisible(true); }} style={styles.detailsIcon}>
              <Icon name="eye" size={24} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditEmployee(item)} style={styles.editIcon}>
              <Icon name="pencil" size={24} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDeleteEmployee(item)} style={styles.deleteIcon}>
              <Icon name="delete" size={24} color="#FF5722" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCallConfirmation(item.phone)} style={styles.callIcon}>
              <Icon name="phone" size={24} color={theme.primary} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
  );

  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.message, { color: theme.text }]}>{t('please_select_farm')}</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={t('select_farm')}
            onChangeValue={(itemValue) => {
              setSelectedFarm(itemValue);
            }}
            style={[styles.picker, { backgroundColor: theme.cardBackground, borderColor: theme.borderColor }]}
            dropDownContainerStyle={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
            textStyle={{ color: theme.text }}
            placeholderStyle={{ color: theme.text }}
            arrowIconStyle={{ tintColor: theme.text }}
        />

        {selectedFarm && (
            <FlatList
                data={employees.filter(employee => employee.farm === selectedFarm)}
                renderItem={renderEmployee}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.section}
                ListHeaderComponent={
                  <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground }]}>
                    <Text style={[styles.summaryText, { color: theme.text }]}>{t('farm')}: {selectedFarm}</Text>
                    <Text style={[styles.summaryText, { color: theme.text }]}>{t('total_employees')}: {employees.filter(employee => employee.farm === selectedFarm).length}</Text>



                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => setModalVisible(true)}>
                      <Icon name="account-plus" size={24} color="#fff" />
                      <Text style={styles.buttonText}>{t('add_employee')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => Alert.alert(t('get_report'))}>
                      <Icon name="file-document" size={24} color="#fff" />
                      <Text style={styles.buttonText}>{t('get_report')}</Text>
                    </TouchableOpacity>
                  </View>
                }
            />
        )}

        {!selectedFarm && (
            <Image source={require('../../assets/chick_user_man.png')} style={styles.placeholderImage} />
        )}

        {/* Add/Edit Employee Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{isEditing ? t('edit_employee') : t('add_new_employee')}</Text>
              <TouchableOpacity onPress={selectProfilePicture} style={styles.profilePictureContainer}>
                <Image source={newEmployee.profilePicture ? { uri: newEmployee.profilePicture.uri } : require('../../assets/default-profile.png')} style={styles.profilePictureModal} />
                <Icon name="pencil" size={24} color={theme.primary} style={styles.profilePictureEditIcon} />
              </TouchableOpacity>
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('name')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.name}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('position')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.position}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, position: text })}
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('email')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.email}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, email: text })}
                  keyboardType="email-address"
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('phone')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.phone}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, phone: text })}
                  keyboardType="phone-pad"
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('address')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.address}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, address: text })}
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('works')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.works}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, works: text })}
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('salary')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.salary}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, salary: text })}
                  keyboardType="numeric"
              />
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('username')}
                  placeholderTextColor={theme.placeholderText}
                  value={newEmployee.username}
                  onChangeText={(text) => setNewEmployee({ ...newEmployee, username: text })}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, flex: 1 }]}
                    placeholder={t('password')}
                    placeholderTextColor={theme.placeholderText}
                    value={newEmployee.password}
                    onChangeText={(text) => setNewEmployee({ ...newEmployee, password: text })}
                    secureTextEntry={!passwordVisible}  // Toggle visibility
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{ marginLeft: 10 }}>
                  <Icon name={passwordVisible ? "eye-off" : "eye"} size={24} color={theme.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>{t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.saveButton, { backgroundColor: theme.primary }]} onPress={handleAddEmployee}>
                  <Text style={styles.buttonText}>{isEditing ? t('save_changes') : t('add_employee')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Employee Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{t('are_you_sure')}</Text>
              <Text style={{ color: theme.text }}>{t('delete_employee_confirmation')} {employeeToDelete?.name}?</Text>
              <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
                  placeholder={t('password')}
                  placeholderTextColor={theme.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setDeleteModalVisible(false)}>
                  <Text style={styles.buttonText}>{t('no')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteButton, { backgroundColor: theme.primary }]} onPress={handleDeleteEmployee}>
                  <Text style={styles.buttonText}>{t('yes')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Profile Picture Modal */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={profileModalVisible}
            onRequestClose={() => setProfileModalVisible(false)}
        >
          <View style={styles.profileModalContainer}>
            <View style={[styles.profileModalView, { backgroundColor: theme.cardBackground }]}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setProfileModalVisible(false)}>
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
              <Image source={profilePictureToView ? { uri: profilePictureToView.uri } : require('../../assets/default-profile.png')} style={styles.fullProfilePictureModalView} />
            </View>
          </View>
        </Modal>

        {/* Employee Details Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={detailsModalVisible}
            onRequestClose={() => setDetailsModalVisible(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
            <View style={{
              width: '90%',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              backgroundColor: theme.cardBackground,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 20,
                color: theme.text,
              }}>{t('employee_details')}</Text>

              {viewEmployee && (
                  <>
                    <TouchableOpacity onPress={() => { setProfilePictureToView(viewEmployee.profilePicture); setProfileModalVisible(true); }}>
                      <Image source={viewEmployee.profilePicture ? { uri: viewEmployee.profilePicture.uri } : require('../../assets/default-profile.png')} style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginBottom: 16,
                      }} />
                    </TouchableOpacity>

                    <View style={{ width: '100%', marginBottom: 20 }}>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('name')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.name}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('position')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.position}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('email')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.email}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('phone')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.phone}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('address')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.address}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('works')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.works}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('salary')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{`Rs.${viewEmployee.salary}`}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('role')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.role}</Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          flex: 1,
                          textAlign: 'right',
                          paddingRight: 10,
                          color: theme.text,
                        }}>{t('username')}:</Text>
                        <Text style={{
                          flex: 2,
                          fontSize: 16,
                          textAlign: 'left',
                          color: theme.text,
                        }}>{viewEmployee.username}</Text>
                      </View>
                    </View>
                  </>
              )}

              <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginHorizontal: 5,
                    marginTop: 20,
                    backgroundColor: '#757575',
                  }}
                  onPress={() => setDetailsModalVisible(false)}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>{t('ok')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Call Confirmation Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={callModalVisible}
            onRequestClose={() => setCallModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{t('confirm_call')}</Text>
              <Text style={{ color: theme.text }}>{t('do_you_want_to_call')} {selectedPhoneNumber}?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setCallModalVisible(false)}
                >
                  <Text style={styles.buttonText}>{t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton, { backgroundColor: theme.primary }]}
                    onPress={() => {
                      setCallModalVisible(false);
                      makeCall(selectedPhoneNumber);
                    }}
                >
                  <Text style={styles.buttonText}>{t('call')}</Text>
                </TouchableOpacity>
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
  message: {
    fontSize: 18,
    marginBottom: 16,
  },
  picker: {
    marginBottom: 24,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
  },
  scrollContainer: {
    paddingBottom: 20, // To make space for the content and buttons
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2,
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
  section: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailsIcon: {
    marginRight: 8,
  },
  editIcon: {
    marginRight: 8,
  },
  deleteIcon: {
    marginRight: 8,
  },
  callIcon: {
    marginRight: 1,
  },
  placeholderImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginTop: 120,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profilePictureEditIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 2,
  },
  profilePictureModal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  profileModalView: {
    width: 300,
    height: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullProfilePictureModalView: {
    width: 250,
    height: 250,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default UserManagementScreen;
