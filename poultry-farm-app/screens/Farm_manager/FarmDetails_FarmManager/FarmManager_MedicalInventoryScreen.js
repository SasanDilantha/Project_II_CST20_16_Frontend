import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialMedicals = [
    { id: '1', block: 'Block A', supplier: 'Supplier A', drug: 'Vaccine A', quantity: '50 doses', cost: '1000', date: '2024-01-01', expireDate: '2024-06-01' },
    { id: '2', block: 'Block B', supplier: 'Supplier B', drug: 'Antibiotic B', quantity: '100 doses', cost: '2000', date: '2024-01-05', expireDate: '2024-06-05' },
    { id: '3', block: 'Block C', supplier: 'Supplier C', drug: 'Vitamin C', quantity: '200 doses', cost: '1500', date: '2024-01-10', expireDate: '2024-06-10' },
];

const MedicalInventoryScreen = () => {
    const { theme } = useTheme();
    const [medicals, setMedicals] = useState(initialMedicals);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedMedicalId, setSelectedMedicalId] = useState('');
    const [newMedical, setNewMedical] = useState({ block: '', supplier: '', drug: '', quantity: '', cost: '', date: new Date().toISOString().split('T')[0], expireDate: new Date().toISOString().split('T')[0] });
    const [editMedical, setEditMedical] = useState({ id: '', block: '', supplier: '', drug: '', quantity: '', cost: '', date: '', expireDate: '' });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerFor, setDatePickerFor] = useState('');

    const handleDelete = (medicalId) => {
        setSelectedMedicalId(medicalId);
        setPasswordModalVisible(true);
    };

    const confirmDelete = () => {
        if (password === 'm') {
            setMedicals((prevMedicals) => prevMedicals.filter((medical) => medical.id !== selectedMedicalId));
            setPasswordModalVisible(false);
            setPassword('');
        } else {
            Alert.alert('Error', 'Incorrect password. Please try again.');
        }
    };

    const handleAddMedical = () => {
        if (!newMedical.block || !newMedical.supplier || !newMedical.drug || !newMedical.quantity || !newMedical.cost || !newMedical.date || !newMedical.expireDate) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        const newMedicalData = {
            id: `${Date.now()}`,
            block: newMedical.block,
            supplier: newMedical.supplier,
            drug: newMedical.drug,
            quantity: newMedical.quantity,
            cost: newMedical.cost,
            date: newMedical.date,
            expireDate: newMedical.expireDate,
        };

        setMedicals((prevMedicals) => [...prevMedicals, newMedicalData]);
        setModalVisible(false);
        setNewMedical({ block: '', supplier: '', drug: '', quantity: '', cost: '', date: new Date().toISOString().split('T')[0], expireDate: new Date().toISOString().split('T')[0] });
    };

    const handleEditMedical = () => {
        if (!editMedical.supplier || !editMedical.drug || !editMedical.quantity || !editMedical.cost || !editMedical.date || !editMedical.expireDate) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        setMedicals((prevMedicals) => prevMedicals.map((medical) => medical.id === editMedical.id ? editMedical : medical));
        setEditModalVisible(false);
        setEditMedical({ id: '', block: '', supplier: '', drug: '', quantity: '', cost: '', date: '', expireDate: '' });
    };

    const handleOpenEditModal = (medical) => {
        setEditMedical(medical);
        setEditModalVisible(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);

        if (datePickerFor === 'newDate') {
            setNewMedical({ ...newMedical, date: currentDate.toISOString().split('T')[0] });
        } else if (datePickerFor === 'newExpireDate') {
            setNewMedical({ ...newMedical, expireDate: currentDate.toISOString().split('T')[0] });
        } else if (datePickerFor === 'editDate') {
            setEditMedical({ ...editMedical, date: currentDate.toISOString().split('T')[0] });
        } else if (datePickerFor === 'editExpireDate') {
            setEditMedical({ ...editMedical, expireDate: currentDate.toISOString().split('T')[0] });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                {medicals.map((medical) => (
                    <View key={medical.id} style={[styles.blockCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                        <Text style={[styles.blockTitle, { color: theme.primary }]}>{medical.block}</Text>
                        <View style={styles.medicalDetails}>
                            <View style={styles.detailRow}>
                                <Icon name="pill" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Drug: {medical.drug}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {medical.supplier}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Quantity: {medical.quantity}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Cost: {medical.cost}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Purchase Date: {medical.date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Expire Date: {medical.expireDate}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() => handleOpenEditModal(medical)} style={[styles.actionButton, { backgroundColor: theme.primary }]}>
                                    <MaterialIcons name="edit" size={20} color="#fff" />
                                </TouchableOpacity>
                                <View style={styles.buttonSpacing} />
                                <TouchableOpacity onPress={() => handleDelete(medical.id)} style={[styles.actionButton, { backgroundColor: theme.primary }]}>
                                    <MaterialIcons name="delete" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={[styles.floatingButton, { backgroundColor: theme.primary }]} onPress={() => { setModalVisible(true); setDatePickerFor('newDate'); }}>
                <MaterialIcons name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Add New Medical</Text>

                        <TextInput
                            placeholder="Block"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newMedical.block}
                            onChangeText={(text) => setNewMedical({ ...newMedical, block: text })}
                        />

                        <TextInput
                            placeholder="Supplier"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newMedical.supplier}
                            onChangeText={(text) => setNewMedical({ ...newMedical, supplier: text })}
                        />

                        <TextInput
                            placeholder="Drug"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newMedical.drug}
                            onChangeText={(text) => setNewMedical({ ...newMedical, drug: text })}
                        />

                        <TextInput
                            placeholder="Quantity"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newMedical.quantity}
                            onChangeText={(text) => setNewMedical({ ...newMedical, quantity: text })}
                        />

                        <TextInput
                            placeholder="Cost"
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newMedical.cost}
                            onChangeText={(text) => setNewMedical({ ...newMedical, cost: text })}
                        />

                        <View>
                            <Text style={[styles.label, { color: theme.text }]}>Purchase Date</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('newDate'); }}>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newMedical.date}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.label, { color: theme.text }]}>Expire Date</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('newExpireDate'); }}>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newMedical.expireDate}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>
                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date(datePickerFor.includes('Expire') ? newMedical.expireDate : newMedical.date)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddMedical}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={editModalVisible} animationType="slide" transparent={true} onRequestClose={() => setEditModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Edit Medical</Text>
                        <TextInput placeholder="Block" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editMedical.block} editable={false} />
                        <TextInput placeholder="Supplier" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editMedical.supplier} onChangeText={(text) => setEditMedical({ ...editMedical, supplier: text })} />
                        <TextInput placeholder="Drug" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editMedical.drug} onChangeText={(text) => setEditMedical({ ...editMedical, drug: text })} />
                        <TextInput placeholder="Quantity" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editMedical.quantity} onChangeText={(text) => setEditMedical({ ...editMedical, quantity: text })} />
                        <TextInput placeholder="Cost" keyboardType="numeric" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editMedical.cost} onChangeText={(text) => setEditMedical({ ...editMedical, cost: text })} />
                        <View>
                            <Text style={[styles.label, { color: theme.text }]}>Purchase Date</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('newDate'); }}>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newMedical.date}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.label, { color: theme.text }]}>Expire Date</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('newExpireDate'); }}>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newMedical.expireDate}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>
                        {showDatePicker && datePickerFor.includes('edit') && (
                            <DateTimePicker
                                value={new Date(datePickerFor === 'editExpireDate' ? editMedical.expireDate : editMedical.date)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleEditMedical}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={passwordModalVisible} animationType="slide" transparent={true} onRequestClose={() => setPasswordModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Enter Password</Text>
                        <TextInput
                            placeholder="Password"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setPasswordModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={confirmDelete}>
                                <Text style={styles.buttonText}>Confirm</Text>
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
    blockCard: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    blockTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    medicalDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    detailText: {
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    actionButton: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    buttonSpacing: {
        width: 10, // Space between buttons
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
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
    input: {
        width: '100%',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
    addButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MedicalInventoryScreen;
