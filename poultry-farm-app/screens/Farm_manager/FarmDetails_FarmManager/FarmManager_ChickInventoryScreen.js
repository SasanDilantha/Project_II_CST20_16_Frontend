import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const initialChicks = [
    { id: '1', block: 'Block A', supplier: 'Supplier A', breed: 'Breed X', quantity: 150, cost: '3000', purchaseDate: '2024-01-01' },
    { id: '2', block: 'Block B', supplier: 'Supplier B', breed: 'Breed Y', quantity: 200, cost: '5000', purchaseDate: '2024-01-05' },
    { id: '3', block: 'Block C', supplier: 'Supplier A', breed: 'Breed Z', quantity: 250, cost: '5000', purchaseDate: '2024-01-10' },
];

const ChickInventoryScreen = () => {
    const { theme } = useTheme();
    const [chicks, setChicks] = useState(initialChicks);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedChickId, setSelectedChickId] = useState('');
    const [newChick, setNewChick] = useState({ block: '', supplier: '', breed: '', quantity: '', cost: '', purchaseDate: new Date().toISOString().split('T')[0] });
    const [editChick, setEditChick] = useState({ id: '', block: '', supplier: '', breed: '', quantity: '', cost: '', purchaseDate: '' });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerFor, setDatePickerFor] = useState('');

    const calculateAgeInDays = (purchaseDate) => {
        const currentDate = new Date();
        const purchaseDateObj = new Date(purchaseDate);
        const differenceInTime = currentDate.getTime() - purchaseDateObj.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    };

    const handleDelete = (chickId) => {
        setSelectedChickId(chickId);
        setPasswordModalVisible(true);
    };

    const confirmDelete = () => {
        if (password === 'm') {
            setChicks((prevChicks) => prevChicks.filter((chick) => chick.id !== selectedChickId));
            setPasswordModalVisible(false);
            setPassword('');
        } else {
            Alert.alert('Error', 'Incorrect password. Please try again.');
        }
    };

    const handleAddChick = () => {
        if (!newChick.block || !newChick.supplier || !newChick.breed || !newChick.quantity || !newChick.cost || !newChick.purchaseDate) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        const newChickData = {
            id: `${Date.now()}`,
            block: newChick.block,
            supplier: newChick.supplier,
            breed: newChick.breed,
            quantity: parseInt(newChick.quantity),
            cost: newChick.cost,
            purchaseDate: newChick.purchaseDate,
        };

        setChicks((prevChicks) => [...prevChicks, newChickData]);
        setModalVisible(false);
        setNewChick({ block: '', supplier: '', breed: '', quantity: '', cost: '', purchaseDate: new Date().toISOString().split('T')[0] });
    };

    const handleEditChick = () => {
        if (!editChick.supplier || !editChick.breed || !editChick.quantity || !editChick.cost || !editChick.purchaseDate) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        setChicks((prevChicks) => prevChicks.map((chick) => chick.id === editChick.id ? editChick : chick));
        setEditModalVisible(false);
        setEditChick({ id: '', block: '', supplier: '', breed: '', quantity: '', cost: '', purchaseDate: '' });
    };

    const handleOpenEditModal = (chick) => {
        setEditChick(chick);
        setEditModalVisible(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);

        if (datePickerFor === 'new') {
            setNewChick({ ...newChick, purchaseDate: currentDate.toISOString().split('T')[0] });
        } else {
            setEditChick({ ...editChick, purchaseDate: currentDate.toISOString().split('T')[0] });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                {chicks.map((chick) => (
                    <View key={chick.id} style={[styles.blockCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                        <Text style={[styles.blockTitle, { color: theme.primary }]}>{chick.block}</Text>
                        <View style={styles.chickDetails}>
                            <View style={styles.detailRow}>
                                <Icon name="bird" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Breed: {chick.breed}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {chick.supplier}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Quantity: {chick.quantity}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Cost: {chick.cost}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Purchase Date: {chick.purchaseDate}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Age: {calculateAgeInDays(chick.purchaseDate)} days</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() => handleOpenEditModal(chick)} style={[styles.actionButton, { backgroundColor: theme.primary }]}>
                                    <MaterialIcons name="edit" size={20} color="#fff" />
                                </TouchableOpacity>
                                <View style={styles.buttonSpacing} />
                                <TouchableOpacity onPress={() => handleDelete(chick.id)} style={[styles.actionButton, { backgroundColor: theme.primary }]}>
                                    <MaterialIcons name="delete" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={[styles.floatingButton, { backgroundColor: theme.primary }]} onPress={() => { setModalVisible(true); setDatePickerFor('new'); }}>
                <MaterialIcons name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Add New Chick</Text>

                        <TextInput
                            placeholder="Block"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newChick.block}
                            onChangeText={(text) => setNewChick({ ...newChick, block: text })}
                        />

                        <TextInput
                            placeholder="Supplier"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newChick.supplier}
                            onChangeText={(text) => setNewChick({ ...newChick, supplier: text })}
                        />

                        <TextInput
                            placeholder="Breed"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newChick.breed}
                            onChangeText={(text) => setNewChick({ ...newChick, breed: text })}
                        />

                        <TextInput
                            placeholder="Quantity"
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newChick.quantity}
                            onChangeText={(text) => setNewChick({ ...newChick, quantity: text })}
                        />

                        <TextInput
                            placeholder="Cost"
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newChick.cost}
                            onChangeText={(text) => setNewChick({ ...newChick, cost: text })}
                        />
                        <View>
                            <Text style={[styles.label, { color: theme.text }]}>Purchase Date</Text>

                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('editDate'); }}>
                                <TextInput
                                    placeholder="Purchase Date (YYYY-MM-DD)"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newChick.purchaseDate}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date(newChick.purchaseDate)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddChick}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={editModalVisible} animationType="slide" transparent={true} onRequestClose={() => setEditModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Edit Chick</Text>
                        <TextInput placeholder="Block" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editChick.block} editable={false} />
                        <TextInput placeholder="Supplier" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editChick.supplier} onChangeText={(text) => setEditChick({ ...editChick, supplier: text })} />
                        <TextInput placeholder="Breed" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editChick.breed} onChangeText={(text) => setEditChick({ ...editChick, breed: text })} />
                        <TextInput placeholder="Quantity" keyboardType="numeric" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editChick.quantity.toString()} onChangeText={(text) => setEditChick({ ...editChick, quantity: text })} />
                        <TextInput placeholder="Cost" keyboardType="numeric" style={[styles.input, { color: theme.text, borderColor: theme.primary }]} placeholderTextColor={theme.placeholder} value={editChick.cost} onChangeText={(text) => setEditChick({ ...editChick, cost: text })} />

                        <Text style={[styles.label, { color: theme.text }]}>Purchase Date</Text>

                        <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('editDate'); }}>
                            <TextInput
                                placeholder="Purchase Date (YYYY-MM-DD)"
                                style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                placeholderTextColor={theme.placeholder}
                                value={newChick.purchaseDate}
                                editable={false}
                            />
                        </TouchableOpacity>

                        {showDatePicker && datePickerFor === 'edit' && (
                            <DateTimePicker
                                value={new Date(editChick.purchaseDate)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleEditChick}>
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
    chickDetails: {
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

export default ChickInventoryScreen;
