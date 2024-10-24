import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const FarmManager_UserManagementScreen = () => {
    const { theme } = useTheme();
    const { t } = useTranslation(); // Initialize the translation hook

    const [employees, setEmployees] = useState([
        { id: '1', name: 'John Doe', position: 'Farm Manager', email: 'john@example.com', phone: '1234567890', address: '123 Farm Road', farm: 'Happy Farm', works: 'Supervising', salary: 5000, role: 'Farm Manager', profilePicture: null },
        { id: '2', name: 'Jane Smith', position: 'Farm Worker', email: 'jane@example.com', phone: '0987654321', address: '456 Farm Lane', farm: 'Happy Farm', works: 'Feeding', salary: 3000, role: 'Farm Employee', profilePicture: null },
        { id: '3', name: 'Sam Green', position: 'Veterinarian', email: 'sam@example.com', phone: '1112223333', address: '789 Farm Street', farm: 'Sunshine Farm', works: 'Animal Health', salary: 4500, role: 'Veterinarian', profilePicture: null },
        { id: '4', name: 'Emily White', position: 'Farm Worker', email: 'emily@example.com', phone: '4445556666', address: '101 Farm Blvd', farm: 'Sunshine Farm', works: 'Maintenance', salary: 2800, role: 'Farm Employee', profilePicture: null },
        { id: '5', name: 'Michael Brown', position: 'Accountant', email: 'michael@example.com', phone: '7778889999', address: '102 Farm Rd', farm: 'Happy Farm', works: 'Finance', salary: 4000, role: 'Accountant', profilePicture: null },
        { id: '6', name: 'Linda Blue', position: 'Farm Worker', email: 'linda@example.com', phone: '1122334455', address: '103 Farm St', farm: 'Happy Farm', works: 'Harvesting', salary: 2900, role: 'Farm Employee', profilePicture: null },
    ]);

    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [callModalVisible, setCallModalVisible] = useState(false);
    const [profilePictureToView, setProfilePictureToView] = useState(null);
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);

    const farmName = 'Happy Farm';

    const filteredEmployees = employees.filter(employee => employee.farm === farmName);

    const initiateCall = (phoneNumber) => {
        const phoneUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneUrl).catch(err => console.error("Failed to make a call", err));
    };

    const renderEmployee = ({ item }) => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => { setProfilePictureToView(item.profilePicture); setProfileModalVisible(true); }} style={styles.profilePictureContainer}>
                <Image source={item.profilePicture ? { uri: item.profilePicture.uri } : require('../../assets/default-profile.png')} style={styles.profilePicture} />
            </TouchableOpacity>
            <View style={styles.cardContent}>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('name')}: {item.name}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('position')}: {item.position}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('email')}: {item.email}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('phone')}: {item.phone}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('address')}: {item.address}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('farm')}: {item.farm}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('works')}: {item.works}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('salary')}: Rs.{item.salary}</Text>
                <Text style={[styles.cardText, { color: theme.text }]}>{t('role')}: {item.role}</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedPhoneNumber(item.phone); setCallModalVisible(true); }} style={styles.callButton}>
                <Icon name="phone" size={24} color="#fff" />
                <Text style={styles.callButtonText}>{t('call')}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.message, { color: theme.text }]}>{t('user_management_for')} {farmName}</Text>

            <FlatList
                data={filteredEmployees}
                renderItem={renderEmployee}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.section}
            />

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
                                style={[styles.modalButton, styles.confirmCallButton]}
                                onPress={() => {
                                    setCallModalVisible(false);
                                    initiateCall(selectedPhoneNumber);
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
    section: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    profilePictureContainer: {
        alignItems: 'center', // Center the profile picture horizontally
    },
    profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 16,
    },
    cardContent: {
        flex: 1,
        marginBottom: 16,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 4,
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        backgroundColor: '#FF9800', // Set a default color that looks good
        width: '100%', // Make the button fill the width of the card
    },
    callButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
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
    confirmCallButton: {
        backgroundColor: '#FF9800',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FarmManager_UserManagementScreen;
