import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const Vet_FarmDetailsScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation(); // Initialize translation hook
    const [modalVisible, setModalVisible] = useState(false);

    const sampleData = {
        farmManager: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            contactNumber: '123-456-7890',
        },
        farm: {
            name: 'Sunshine Farm',
            totalChickens: 1400,
            startedChickCount: 1500,
        },
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.detailCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.title, { color: theme.text }]}>{sampleData.farm.name}</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>{t('started_chick_count')}: {sampleData.farm.startedChickCount}</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>{t('total_chickens')}: {sampleData.farm.totalChickens}</Text>
                <TouchableOpacity
                    style={[styles.managerButton, { backgroundColor: theme.primary }]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={[styles.buttonText, { color: theme.text }]}>{t('farm_manager_details')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: theme.cardBackground }]}
                    onPress={() => navigation.navigate('VetMedicalInventory')}
                >
                    <MaterialIcons name="healing" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>{t('medical_inventory')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: theme.cardBackground }]}
                    onPress={() => navigation.navigate('VetRecommendMedicine')}
                >
                    <MaterialIcons name="assignment" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>{t('recommend_medicine')}</Text>
                </TouchableOpacity>
            </View>



            {/* Modal for Farm Manager Details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>{t('farm_manager_details')}</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>{t('name')}: {sampleData.farmManager.name}</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>{t('email')}: {sampleData.farmManager.email}</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>{t('contact_number')}: {sampleData.farmManager.contactNumber}</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>{t('close')}</Text>
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
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    cardText: {
        marginTop: 8,
        fontSize: 16,
    },
    managerButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        elevation: 2,
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Vet_FarmDetailsScreen;
