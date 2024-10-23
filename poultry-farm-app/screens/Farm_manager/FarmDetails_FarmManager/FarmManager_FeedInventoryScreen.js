import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

const initialFeeds = [
    { id: '1', block: 'Block A', supplier: 'Supplier A', type: 'Starter Feed', quantity: '500 kg', cost: '20000', date: '2024-01-01', expireDate: '2024-06-01' },
    { id: '2', block: 'Block B', supplier: 'Supplier B', type: 'Grower Feed', quantity: '300 kg', cost: '15000', date: '2024-01-05', expireDate: '2024-06-05' },
    { id: '3', block: 'Block C', supplier: 'Supplier C', type: 'Finisher Feed', quantity: '200 kg', cost: '10000', date: '2024-01-10', expireDate: '2024-06-10' },
];

const FeedInventoryScreen = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [feeds, setFeeds] = useState(initialFeeds);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedFeedId, setSelectedFeedId] = useState('');
    const [newFeed, setNewFeed] = useState({ block: '', supplier: '', type: '', quantity: '', cost: '', date: new Date().toISOString().split('T')[0], expireDate: new Date().toISOString().split('T')[0] });
    const [editFeed, setEditFeed] = useState({ id: '', block: '', supplier: '', type: '', quantity: '', cost: '', date: '', expireDate: '' });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerFor, setDatePickerFor] = useState('');

    const handleDelete = (feedId) => {
        setSelectedFeedId(feedId);
        setPasswordModalVisible(true);
    };

    const confirmDelete = () => {
        if (password === 'm') {
            setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== selectedFeedId));
            setPasswordModalVisible(false);
            setPassword('');
        } else {
            Alert.alert(t('error'), t('incorrect_password'));
        }
    };

    const handleAddFeed = () => {
        if (!newFeed.block || !newFeed.supplier || !newFeed.type || !newFeed.quantity || !newFeed.cost || !newFeed.date || !newFeed.expireDate) {
            Alert.alert(t('error'), t('fill_all_fields'));
            return;
        }

        if (isNaN(newFeed.cost) || isNaN(newFeed.quantity.replace(' kg', ''))) {
            Alert.alert(t('error'), t('cost_quantity_numeric'));
            return;
        }

        const newFeedData = {
            id: `${Date.now()}`,
            block: newFeed.block,
            supplier: newFeed.supplier,
            type: newFeed.type,
            quantity: `${parseInt(newFeed.quantity)} kg`,
            cost: newFeed.cost,
            date: newFeed.date,
            expireDate: newFeed.expireDate,
        };

        setFeeds((prevFeeds) => [...prevFeeds, newFeedData]);
        setModalVisible(false);
        setNewFeed({ block: '', supplier: '', type: '', quantity: '', cost: '', date: new Date().toISOString().split('T')[0], expireDate: new Date().toISOString().split('T')[0] });
    };

    const handleEditFeed = () => {
        if (!editFeed.supplier || !editFeed.type || !editFeed.quantity || !editFeed.cost || !editFeed.date || !editFeed.expireDate) {
            Alert.alert(t('error'), t('fill_all_fields'));
            return;
        }

        if (isNaN(editFeed.cost) || isNaN(editFeed.quantity.replace(' kg', ''))) {
            Alert.alert(t('error'), t('cost_quantity_numeric'));
            return;
        }

        setFeeds((prevFeeds) => prevFeeds.map((feed) => feed.id === editFeed.id ? { ...editFeed, quantity: `${parseInt(editFeed.quantity)} kg` } : feed));
        setEditModalVisible(false);
        setEditFeed({ id: '', block: '', supplier: '', type: '', quantity: '', cost: '', date: '', expireDate: '' });
    };

    const handleOpenEditModal = (feed) => {
        setEditFeed(feed);
        setEditModalVisible(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);

        if (datePickerFor === 'newDate') {
            setNewFeed({ ...newFeed, date: currentDate.toISOString().split('T')[0] });
        } else if (datePickerFor === 'newExpireDate') {
            setNewFeed({ ...newFeed, expireDate: currentDate.toISOString().split('T')[0] });
        } else if (datePickerFor === 'editDate') {
            setEditFeed({ ...editFeed, date: currentDate.toISOString().split('T')[0] });
        } else if (datePickerFor === 'editExpireDate') {
            setEditFeed({ ...editFeed, expireDate: currentDate.toISOString().split('T')[0] });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                {feeds.map((feed) => (
                    <View key={feed.id} style={[styles.blockCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                        <Text style={[styles.blockTitle, { color: theme.primary }]}>{feed.block}</Text>
                        <View style={styles.feedDetails}>
                            <View style={styles.detailRow}>
                                <Icon name="food-apple" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('type')}: {feed.type}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('supplier')}: {feed.supplier}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('quantity')}: {feed.quantity}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('cost')}: {feed.cost}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('purchase_date')}: {feed.date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
                                <Text style={[styles.detailText, { color: theme.text }]}>{t('expire_date')}: {feed.expireDate}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() => handleOpenEditModal(feed)} style={[styles.actionButton, { backgroundColor: theme.primary }]}>
                                    <MaterialIcons name="edit" size={20} color="#fff" />
                                </TouchableOpacity>
                                <View style={styles.buttonSpacing} />
                                <TouchableOpacity onPress={() => handleDelete(feed.id)} style={[styles.actionButton, { backgroundColor: theme.primary }]}>
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

            {/* Add Feed Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>{t('add_new_feed')}</Text>

                        <TextInput
                            placeholder={t('block')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newFeed.block}
                            onChangeText={(text) => setNewFeed({ ...newFeed, block: text })}
                        />

                        <TextInput
                            placeholder={t('supplier')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newFeed.supplier}
                            onChangeText={(text) => setNewFeed({ ...newFeed, supplier: text })}
                        />

                        <TextInput
                            placeholder={t('type')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newFeed.type}
                            onChangeText={(text) => setNewFeed({ ...newFeed, type: text })}
                        />

                        <TextInput
                            placeholder={t('quantity')}
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newFeed.quantity}
                            onChangeText={(text) => setNewFeed({ ...newFeed, quantity: text })}
                        />

                        <TextInput
                            placeholder={t('cost')}
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={newFeed.cost}
                            onChangeText={(text) => setNewFeed({ ...newFeed, cost: text })}
                        />

                        <View>
                            <Text style={[styles.label, { color: theme.text }]}>{t('purchase_date')}</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('newDate'); }}>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newFeed.date}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.label, { color: theme.text }]}>{t('expire_date')}</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('newExpireDate'); }}>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={newFeed.expireDate}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={datePickerFor === 'newDate' ? new Date(newFeed.date) : new Date(newFeed.expireDate)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>{t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddFeed}>
                                <Text style={styles.buttonText}>{t('add')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Feed Modal */}
            <Modal visible={editModalVisible} animationType="slide" transparent={true} onRequestClose={() => setEditModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>{t('edit_feed')}</Text>

                        <TextInput
                            placeholder={t('block')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={editFeed.block}
                            editable={false}
                        />

                        <TextInput
                            placeholder={t('supplier')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={editFeed.supplier}
                            onChangeText={(text) => setEditFeed({ ...editFeed, supplier: text })}
                        />

                        <TextInput
                            placeholder={t('type')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={editFeed.type}
                            onChangeText={(text) => setEditFeed({ ...editFeed, type: text })}
                        />

                        <TextInput
                            placeholder={t('quantity')}
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={editFeed.quantity}
                            onChangeText={(text) => setEditFeed({ ...editFeed, quantity: text })}
                        />

                        <TextInput
                            placeholder={t('cost')}
                            keyboardType="numeric"
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={editFeed.cost}
                            onChangeText={(text) => setEditFeed({ ...editFeed, cost: text })}
                        />

                        <View>
                            <Text style={[styles.label, { color: theme.text }]}>{t('purchase_date')}</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('editDate'); }}>
                                <TextInput
                                    placeholder={t('purchase_date')}
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={editFeed.date}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.label, { color: theme.text }]}>{t('expire_date')}</Text>
                            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDatePickerFor('editExpireDate'); }}>
                                <TextInput
                                    placeholder={t('expire_date')}
                                    style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                                    placeholderTextColor={theme.placeholder}
                                    value={editFeed.expireDate}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>
                        {showDatePicker && (datePickerFor === 'editDate' || datePickerFor === 'editExpireDate') && (
                            <DateTimePicker
                                value={datePickerFor === 'editDate' ? new Date(editFeed.date) : new Date(editFeed.expireDate)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditModalVisible(false)}>
                                <Text style={styles.buttonText}>{t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleEditFeed}>
                                <Text style={styles.buttonText}>{t('save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Password Modal */}
            <Modal visible={passwordModalVisible} animationType="slide" transparent={true} onRequestClose={() => setPasswordModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>{t('enter_password')}</Text>

                        <TextInput
                            placeholder={t('password')}
                            style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
                            placeholderTextColor={theme.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setPasswordModalVisible(false)}>
                                <Text style={styles.buttonText}>{t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={confirmDelete}>
                                <Text style={styles.buttonText}>{t('confirm')}</Text>
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
    feedDetails: {
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

export default FeedInventoryScreen;
