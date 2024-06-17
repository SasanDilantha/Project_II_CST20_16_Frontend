import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const FinanceScreen = () => {
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income'); // 'income' or 'expense'

  const addTransaction = () => {
    if (amount && description) {
      setTransactions([...transactions, { id: Date.now().toString(), amount, description, type }]);
      setAmount('');
      setDescription('');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Income</Text>
          <Text style={[styles.cardAmount, { color: theme.primary }]}>
            ${transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + parseFloat(t.amount), 0).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Expenses</Text>
          <Text style={[styles.cardAmount, { color: theme.primary }]}>
            ${transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + parseFloat(t.amount), 0).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.borderColor }]}
          placeholder="Amount"
          placeholderTextColor={theme.text}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.borderColor }]}
          placeholder="Description"
          placeholderTextColor={theme.text}
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'income' ? { backgroundColor: theme.primary } : { backgroundColor: theme.buttonBackground }]}
            onPress={() => setType('income')}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'expense' ? { backgroundColor: theme.primary } : { backgroundColor: theme.buttonBackground }]}
            onPress={() => setType('expense')}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>Expense</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={addTransaction}>
          <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.transaction, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
            <Text style={[styles.transactionText, { color: theme.text }]}>{item.description}</Text>
            <Text style={[styles.transactionAmount, { color: theme.primary }]}>${item.amount}</Text>
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeButton: {
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
  addButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
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
  transactionText: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinanceScreen;
