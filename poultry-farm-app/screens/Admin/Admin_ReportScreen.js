import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../../theme/ThemeContext';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const ReportScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation(); // Initialize the translation hook
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: t('happy_farm'), value: 'Happy Farm' },
    { label: t('sunshine_farm'), value: 'Sunshine Farm' }
  ]);

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
    {
      name: 'Sunshine Farm',
      location: 'Sunny Valley',
      chickens: 1200,
      dailyReport: {
        eggsCollected: 350,
        mortalityRate: 1.5,
        feedConsumed: 55,
        income: 500,
        expenses: 220,
      },
      monthlyReport: {
        eggsCollected: 10500,
        mortalityRate: 45,
        feedConsumed: 1650,
        income: 15000,
        expenses: 6600,
      },
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
          <Text style={[styles.title, { color: theme.primary }]}>{t('farm_details')}</Text>
          <Icon name={collapsedSections.farmDetails ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.farmDetails}>
          <View style={styles.sectionContent}>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('name')}: {item.name}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('location')}: {item.location}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('total_chickens')}: {item.chickens}</Text>
          </View>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('chickDetails')} style={styles.sectionHeader}>
          <Text style={[styles.title, { color: theme.primary }]}>{t('chick_details')}</Text>
          <Icon name={collapsedSections.chickDetails ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.chickDetails}>
          <View style={styles.sectionContent}>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('total_chicks')}: {item.chickDetails.totalChicks}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('healthy_chicks')}: {item.chickDetails.healthyChicks}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('sick_chicks')}: {item.chickDetails.sickChicks}</Text>
          </View>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('healthReport')} style={styles.sectionHeader}>
          <Text style={[styles.title, { color: theme.primary }]}>{t('health_report')}</Text>
          <Icon name={collapsedSections.healthReport ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.healthReport}>
          <View style={styles.sectionContent}>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('vaccinated')}: {item.healthReport.vaccinated}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('not_vaccinated')}: {item.healthReport.notVaccinated}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('diseases')}: {item.healthReport.diseases}</Text>
          </View>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('dailyReport')} style={styles.sectionHeader}>
          <Text style={[styles.title, { color: theme.primary }]}>{t('daily_report')}</Text>
          <Icon name={collapsedSections.dailyReport ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.dailyReport}>
          <View style={styles.sectionContent}>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('eggs_collected')}: {item.dailyReport.eggsCollected}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('mortality_rate')}: {item.dailyReport.mortalityRate}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('feed_consumed')}: {item.dailyReport.feedConsumed} kg</Text>
            <Text style={[styles.incomeText, { color: theme.primary }]}>{t('income')}: Rs.{item.dailyReport.income}</Text>
            <Text style={[styles.expenseText, { color: theme.primary }]}>{t('expenses')}: Rs.{item.dailyReport.expenses}</Text>
          </View>
        </Collapsible>

        <TouchableOpacity onPress={() => toggleSection('monthlyReport')} style={styles.sectionHeader}>
          <Text style={[styles.title, { color: theme.primary }]}>{t('monthly_report')}</Text>
          <Icon name={collapsedSections.monthlyReport ? 'chevron-down' : 'chevron-up'} size={24} color={theme.primary} />
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSections.monthlyReport}>
          <View style={styles.sectionContent}>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('eggs_collected')}: {item.monthlyReport.eggsCollected}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('mortality_rate')}: {item.monthlyReport.mortalityRate}</Text>
            <Text style={[styles.detailText, { color: theme.text }]}>{t('feed_consumed')}: {item.monthlyReport.feedConsumed} kg</Text>
            <Text style={[styles.incomeText, { color: theme.primary }]}>{t('income')}: Rs.{item.monthlyReport.income}</Text>
            <Text style={[styles.expenseText, { color: theme.primary }]}>{t('expenses')}: Rs.{item.monthlyReport.expenses}</Text>
          </View>
        </Collapsible>
      </View>
  );

  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.message, { color: theme.text }]}>{t('please_choose_farm')}</Text>
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

        {selectedFarm ? (
            <>
              <FlatList
                  data={farms.filter(farm => farm.name === selectedFarm)}
                  renderItem={renderFarmDetail}
                  keyExtractor={item => item.name}
              />
            </>
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
  placeholderImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginTop: 120,
  },
});

export default ReportScreen;
