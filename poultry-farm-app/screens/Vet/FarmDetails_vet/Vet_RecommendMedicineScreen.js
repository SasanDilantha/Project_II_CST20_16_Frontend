// screens/Vet/FarmDetails_vet/Vet_RecommendMedicineScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../theme/ThemeContext';
import { ProgressBar } from 'react-native-paper';

const Vet_RecommendMedicineScreen = () => {
    const { theme } = useTheme();

    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([
        { id: '1', blockId: '1', text: 'Note 1 for Block A' },
        { id: '2', blockId: '2', text: 'Note 2 for Block B' },
    ]);

    const chickBlocks = [
        {
            id: '1',
            name: 'Block A',
            totalChicks: 200,
            healthyChicks: 190,
            heat: 0.5, // Normal (50% of the bar)
            ammonia: 0.2, // Low (20% of the bar)
        },
        {
            id: '2',
            name: 'Block B',
            totalChicks: 150,
            healthyChicks: 145,
            heat: 0.9, // High (90% of the bar)
            ammonia: 0.5, // Normal (50% of the bar)
        },
    ];

    const handleAddNote = (blockId) => {
        if (note.trim() === '') {
            Alert.alert('Error', 'Note cannot be empty');
            return;
        }

        const newNote = { id: Date.now().toString(), blockId, text: note };
        setNotes([...notes, newNote]);
        setNote('');
    };

    const handleDeleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };

    const renderNotes = (blockId) => (
        notes.filter(note => note.blockId === blockId).map(note => (
            <View key={note.id} style={[styles.noteContainer, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.noteText, { color: theme.text }]}>{note.text}</Text>
                <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                    <MaterialIcons name="delete" size={20} color={theme.primary} />
                </TouchableOpacity>
            </View>
        ))
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={chickBlocks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.chickBlockCard, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.blockTitle, { color: theme.text }]}>{item.name}</Text>
                        <View style={styles.chickCountContainer}>
                            <View style={[styles.chickCountBox, { backgroundColor: theme.orange }]}>
                                <Text style={[styles.chickCountText, { color: theme.text }]}>Total Chicks</Text>
                                <Text style={[styles.chickCountNumber, { color: theme.text }]}>{item.totalChicks}</Text>
                            </View>
                            <View style={[styles.chickCountBox, { backgroundColor: theme.orange }]}>
                                <Text style={[styles.chickCountText, { color: theme.text }]}>Current Chicks</Text>
                                <Text style={[styles.chickCountNumber, { color: theme.text }]}>{item.healthyChicks}</Text>
                            </View>
                        </View>

                        <Text style={[styles.blockDetail, { color: theme.text }]}>Heat Level: {Math.round(item.heat * 100)}%</Text>
                        <ProgressBar progress={item.heat} color={item.heat > 0.7 ? 'red' : 'green'} style={styles.progressBar} />

                        <Text style={[styles.blockDetail, { color: theme.text }]}>Ammonia Level: {Math.round(item.ammonia * 100)}%</Text>
                        <ProgressBar progress={item.ammonia} color={item.ammonia > 0.7 ? 'red' : 'green'} style={styles.progressBar} />

                        <View style={styles.medicineRecommendation}>
                            <TextInput
                                style={[styles.noteInput, { borderColor: theme.primary, color: theme.text }]}
                                placeholder="Add a note"
                                placeholderTextColor={theme.text}
                                value={note}
                                onChangeText={setNote}
                            />

                            <TouchableOpacity
                                style={[styles.recommendButton, { backgroundColor: theme.primary }]}
                                onPress={() => handleAddNote(item.id)}
                            >
                                <Text style={[styles.recommendButtonText, { color: theme.text }]}>Add Note</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.notesContainer}>
                            {renderNotes(item.id)}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    chickBlockCard: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    blockTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    chickCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    chickCountBox: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        margin: 4,
        elevation: 2,
    },
    chickCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    chickCountNumber: {
        fontSize: 16,
    },
    blockDetail: {
        fontSize: 16,
        marginBottom: 4,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
        marginBottom: 8,
    },
    medicineRecommendation: {
        marginTop: 16,
    },
    noteInput: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        marginBottom: 8,
    },
    recommendButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    recommendButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    notesContainer: {
        marginTop: 16,
    },
    noteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    noteText: {
        fontSize: 16,
    },
});

export default Vet_RecommendMedicineScreen;
