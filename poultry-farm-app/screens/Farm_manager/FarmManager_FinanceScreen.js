import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const FarmManager_FinanceScreen = () => {
    const { theme } = useTheme();

    const [transactions, setTransactions] = useState([
        { id: '1', amount: '800', description: 'Chicken sales', type: 'income', date: '2024-06-01', farm: 'Happy Farm' },
        { id: '2', amount: '200', description: 'Feed purchase', type: 'expense', date: '2024-06-02', farm: 'Happy Farm' },
        { id: '3', amount: '1000', description: 'Manure sales', type: 'income', date: '2024-06-03', farm: 'Sunshine Farm' },
        { id: '4', amount: '150', description: 'Medication', type: 'expense', date: '2024-06-04', farm: 'Sunshine Farm' },
        { id: '5', amount: '500', description: 'Chicken sales', type: 'income', date: '2024-06-05', farm: 'Happy Farm' },
        { id: '6', amount: '300', description: 'New coop construction', type: 'expense', date: '2024-06-06', farm: 'Happy Farm' },
        { id: '7', amount: '250', description: 'Vaccination', type: 'expense', date: '2024-06-07', farm: 'Sunshine Farm' },
        { id: '8', amount: '750', description: 'Chicken sales', type: 'income', date: '2024-06-08', farm: 'Happy Farm' },
        { id: '9', amount: '400', description: 'Feed purchase', type: 'expense', date: '2024-06-09', farm: 'Sunshine Farm' },
        { id: '10', amount: '1200', description: 'Chicken sales', type: 'income', date: '2024-06-10', farm: 'Sunshine Farm' },
        { id: '11', amount: '100', description: 'Veterinary visit', type: 'expense', date: '2024-06-11', farm: 'Happy Farm' },
        { id: '12', amount: '800', description: 'Manure sales', type: 'income', date: '2024-06-12', farm: 'Happy Farm' },
        { id: '13', amount: '350', description: 'New feed silo', type: 'expense', date: '2024-06-13', farm: 'Sunshine Farm' },
        { id: '14', amount: '900', description: 'Chicken sales', type: 'income', date: '2024-06-14', farm: 'Sunshine Farm' },
        { id: '15', amount: '150', description: 'Feed purchase', type: 'expense', date: '2024-06-15', farm: 'Happy Farm' }
    ]);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('income'); // 'income' or 'expense'
    const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'

    const farmName = 'Happy Farm';

    const addTransaction = () => {
        if (amount && description) {
            setTransactions([...transactions, { id: Date.now().toString(), amount, description, type, date: new Date().toLocaleDateString(), farm: farmName }]);
            setAmount('');
            setDescription('');
        } else {
            alert('Please fill out all fields');
        }
    };

    const filteredTransactions = transactions.filter((t) => {
        if (filterType === 'all') return t.farm === farmName;
        return t.farm === farmName && t.type === filterType;
    });

    const totalIncome = transactions.filter(t => t.farm === farmName && t.type === 'income').reduce((acc, t) => acc + parseFloat(t.amount), 0).toFixed(2);
    const totalExpenses = transactions.filter(t => t.farm === farmName && t.type === 'expense').reduce((acc, t) => acc + parseFloat(t.amount), 0).toFixed(2);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                <Text style={[styles.summaryTitle, { color: theme.primary }]}>Farm: {farmName}</Text>
                <View style={styles.summaryContent}>
                    <Text style={[styles.summaryText, { color: theme.primary }]}>Total Income: </Text>
                    <Text style={[styles.summaryAmount, { color: 'green' }]}>Rs.{totalIncome}</Text>
                </View>
                <View style={styles.summaryContent}>
                    <Text style={[styles.summaryText, { color: theme.primary }]}>Total Expenses: </Text>
                    <Text style={[styles.summaryAmount, { color: 'red' }]}>Rs.{totalExpenses}</Text>
                </View>
            </View>

            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={[styles.filterButton, filterType === 'all' ? { backgroundColor: theme.primary } : { backgroundColor: theme.buttonBackground }]}
                    onPress={() => setFilterType('all')}
                >
                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filterType === 'income' ? { backgroundColor: theme.primary } : { backgroundColor: theme.buttonBackground }]}
                    onPress={() => setFilterType('income')}
                >
                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>Income</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filterType === 'expense' ? { backgroundColor: theme.primary } : { backgroundColor: theme.buttonBackground }]}
                    onPress={() => setFilterType('expense')}
                >
                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>Expense</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTransactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.transaction, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
                        <View style={styles.transactionDetails}>
                            <Text style={[styles.transactionText, { color: theme.text }]}>{item.description}</Text>
                            <Text style={[styles.transactionDate, { color: theme.text }]}>{item.date}</Text>
                        </View>
                        <Text style={[styles.transactionAmount, { color: item.type === 'income' ? 'green' : 'red' }]}>
                            {item.type === 'income' ? '+' : '-'}Rs.{item.amount}
                        </Text>
                    </View>
                )}
                style={styles.transactionList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    summaryCard: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    summaryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    summaryText: {
        fontSize: 18,
    },
    summaryAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionList: {
        marginTop: 16,
    },
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    transactionDetails: {
        flexDirection: 'column',
    },
    transactionText: {
        fontSize: 16,
        marginBottom: 4,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionDate: {
        fontSize: 14,
    },
});

export default FarmManager_FinanceScreen;
