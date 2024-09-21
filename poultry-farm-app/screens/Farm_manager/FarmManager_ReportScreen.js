import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FarmManager_ReportScreen = () => {
    const { theme } = useTheme();

    const farms = [
        {
            name: 'Happy Farm',
            location: 'Green Valley',
            chickens: 1000,
            dailyReport: {
                eggsCollected: 300,
                mortalityRate: 2,
                feedConsumed: 50,
                income: 450,
                expenses: 200,
            },
            monthlyReport: {
                eggsCollected: 9000,
                mortalityRate: 60,
                feedConsumed: 1500,
                income: 13500,
                expenses: 6000,
            },
            chickDetails: {
                totalChicks: 500,
                healthyChicks: 480,
                sickChicks: 20,
            },
            healthReport: {
                vaccinated: 480,
                notVaccinated: 20,
                diseases: 5,
            },
        },
    ];

    const [collapsedSections, setCollapsedSections] = useState({
        farmDetails: true,
        chickDetails: true,
        healthReport: true,
        dailyReport: true,
        monthlyReport: true,
    });

    const toggleSection = (section) => {
        setCollapsedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const renderFarmDetail = ({ item }) => (
        <View style={[styles.sectionContainer, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => toggleSection('farmDetails')} style={styles.sectionHeader}>
                <Text style={[styles.title, { color: theme.primary }]}>Farm Details</Text>
                <Icon name={collapsedSections.farmDetails ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedSections.farmDetails}>
                <View style={styles.sectionContent}>
                    <Text style={[styles.detailText, { color: theme.text }]}>Name: {item.name}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Location: {item.location}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Total Chickens: {item.chickens}</Text>
                </View>
            </Collapsible>

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

            <TouchableOpacity onPress={() => toggleSection('dailyReport')} style={styles.sectionHeader}>
                <Text style={[styles.title, { color: theme.primary }]}>Daily Report</Text>
                <Icon name={collapsedSections.dailyReport ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedSections.dailyReport}>
                <View style={styles.sectionContent}>
                    <Text style={[styles.detailText, { color: theme.text }]}>Eggs Collected: {item.dailyReport.eggsCollected}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Mortality Rate: {item.dailyReport.mortalityRate}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Feed Consumed: {item.dailyReport.feedConsumed} kg</Text>
                    <Text style={[styles.incomeText, { color: theme.primary }]}>Income: Rs.{item.dailyReport.income}</Text>
                    <Text style={[styles.expenseText, { color: theme.primary }]}>Expenses: Rs.{item.dailyReport.expenses}</Text>
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleSection('monthlyReport')} style={styles.sectionHeader}>
                <Text style={[styles.title, { color: theme.primary }]}>Monthly Report</Text>
                <Icon name={collapsedSections.monthlyReport ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedSections.monthlyReport}>
                <View style={styles.sectionContent}>
                    <Text style={[styles.detailText, { color: theme.text }]}>Eggs Collected: {item.monthlyReport.eggsCollected}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Mortality Rate: {item.monthlyReport.mortalityRate}</Text>
                    <Text style={[styles.detailText, { color: theme.text }]}>Feed Consumed: {item.monthlyReport.feedConsumed} kg</Text>
                    <Text style={[styles.incomeText, { color: theme.primary }]}>Income: Rs.{item.monthlyReport.income}</Text>
                    <Text style={[styles.expenseText, { color: theme.primary }]}>Expenses: Rs.{item.monthlyReport.expenses}</Text>
                </View>
            </Collapsible>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={farms}
                renderItem={renderFarmDetail}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    incomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    expenseText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default FarmManager_ReportScreen;
