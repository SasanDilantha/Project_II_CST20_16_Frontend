import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../../theme/ThemeContext';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Vet_ReportScreen = () => {
    const { theme } = useTheme();
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Healthy Farm', value: 'Healthy Farm' },
        { label: 'Sunshine Farm', value: 'Sunshine Farm' }
    ]);

    const farms = [
        {
            name: 'Healthy Farm',
            location: 'Green Valley',
            chickens: 1200,
            chickDetails: {
                totalChicks: 600,
                healthyChicks: 580,
                sickChicks: 20,
            },
            healthReport: {
                vaccinated: 580,
                notVaccinated: 20,
                diseases: 3,
            },
        },
        {
            name: 'Sunshine Farm',
            location: 'Sunny Valley',
            chickens: 1400,
            chickDetails: {
                totalChicks: 700,
                healthyChicks: 680,
                sickChicks: 20,
            },
            healthReport: {
                vaccinated: 680,
                notVaccinated: 20,
                diseases: 2,
            },
        },
    ];

    const [collapsedSections, setCollapsedSections] = useState({
        chickDetails: true,
        healthReport: true,
    });

    const toggleSection = (section) => {
        setCollapsedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const renderFarmDetail = ({ item }) => (
        <View style={[styles.sectionContainer, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => toggleSection('chickDetails')} style={styles.sectionHeader}>
                <Text style={[styles.title, { color: theme.primary }]}>Chick Details</Text>
                <Icon name={collapsedSections.chickDetails ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedSections.chickDetails}>
                <View style={styles.sectionContent}>
                    <Text style={[styles.detailText, { color: theme.text }]}>Total Chicks: {item.chickDetails.totalChicks}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Healthy Chicks: {item.chickDetails.healthyChicks}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Sick Chicks: {item.chickDetails.sickChicks}</Text>
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleSection('healthReport')} style={styles.sectionHeader}>
                <Text style={[styles.title, { color: theme.primary }]}>Health Report</Text>
                <Icon name={collapsedSections.healthReport ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedSections.healthReport}>
                <View style={styles.sectionContent}>
                    <Text style={[styles.detailText, { color: theme.text }]}>Vaccinated: {item.healthReport.vaccinated}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Not Vaccinated: {item.healthReport.notVaccinated}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Diseases: {item.healthReport.diseases}</Text>
                </View>
            </Collapsible>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.message, { color: theme.text }]}>Please choose a farm to view its report:</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a farm"
                onChangeValue={(itemValue) => {
                    setSelectedFarm(itemValue);
                }}
                style={[styles.picker, { backgroundColor: theme.cardBackground, borderColor: theme.borderColor }]}
                dropDownContainerStyle={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
                textStyle={{ color: theme.text }}
                placeholderStyle={{ color: theme.text }}
                arrowIconStyle={{ tintColor: theme.text }}
            />

            {selectedFarm ? (
                <FlatList
                    data={farms.filter(farm => farm.name === selectedFarm)}
                    renderItem={renderFarmDetail}
                    keyExtractor={item => item.name}
                />
            ) : (
                <Image source={require('../../assets/chick_report.png')} style={styles.placeholderImage} />
            )}
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
    sectionContainer: {
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
    },
    sectionContent: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 4,
    },
    placeholderImage: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
        marginTop: 120,
    },
});

export default Vet_ReportScreen;
