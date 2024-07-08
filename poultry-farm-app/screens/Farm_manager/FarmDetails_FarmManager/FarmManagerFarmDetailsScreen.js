import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

const FarmManagerFarmDetailsScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const sampleData = {
        farmManager: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            contactNumber: '123-456-7890',
        },
        totalEmployees: 10,
        farm: {
            name: 'Sample Farm',
            startedChickCount: 500,
            currentChickCount: 450,
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.detailCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.title, { color: theme.text }]}>{sampleData.farm.name}</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>Started Chick Count: {sampleData.farm.startedChickCount}</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>Remaining Chick Count: {sampleData.farm.currentChickCount}</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>Total Employees: {sampleData.totalEmployees}</Text>



            </View>
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('FarmManager_ChickInventory')}>
                    <MaterialIcons name="egg" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>Chick Inventory</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('FarmManager_FeedInventory')}>
                    <MaterialIcons name="grass" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>Feed Inventory</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('FarmManager_Monitoring')}>
                    <MaterialIcons name="visibility" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>Monitoring</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => navigation.navigate('FarmManager_MedicalInventory')}>
                    <MaterialIcons name="healing" size={40} color={theme.primary} />
                    <Text style={[styles.cardText, { color: theme.text }]}>Medical Inventory</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Farm Manager Details</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>Name: {sampleData.farmManager.name}</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>Email: {sampleData.farmManager.email}</Text>
                        <Text style={[styles.modalText, { color: theme.text }]}>Contact Number: {sampleData.farmManager.contactNumber}</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Close</Text>
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
});

export default FarmManagerFarmDetailsScreen;
