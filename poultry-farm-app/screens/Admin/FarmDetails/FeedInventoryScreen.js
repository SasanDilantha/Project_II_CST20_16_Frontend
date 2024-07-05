import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/ThemeContext';

// Example data grouped by blocks
const blocks = [
  {
    name: 'Block A',
    feeds: [
      { id: '1', supplier: 'Supplier A', type: 'Starter Feed', quantity: '500 kg', cost: 'Rs.20000', date: '2024-01-01', expireDate: '2024-06-01' },
      // Add more feeds if needed
    ],
  },
  {
    name: 'Block B',
    feeds: [
      { id: '2', supplier: 'Supplier B', type: 'Grower Feed', quantity: '300 kg', cost: 'Rs.15000', date: '2024-01-05', expireDate: '2024-06-05' },
      // Add more feeds if needed
    ],
  },
  {
    name: 'Block C',
    feeds: [
      { id: '3', supplier: 'Supplier C', type: 'Finisher Feed', quantity: '200 kg', cost: 'Rs.10000', date: '2024-01-10', expireDate: '2024-06-10' },
      // Add more feeds if needed
    ],
  },
];

const FeedInventoryScreen = () => {
  const { theme } = useTheme();

  return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {blocks.map((block, index) => (
            <View key={index} style={[styles.blockCard, { backgroundColor: theme.cardBackground, shadowColor: theme.shadowColor }]}>
              <Text style={[styles.blockTitle, { color: theme.primary }]}>{block.name}</Text>
              {block.feeds.map((feed) => (
                  <View key={feed.id} style={styles.feedDetails}>
                    <View style={styles.detailRow}>
                      <Icon name="food-apple" size={20} color={theme.iconColor} style={styles.icon} />
                      <Text style={[styles.detailText, { color: theme.text }]}>Type: {feed.type}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="account" size={20} color={theme.iconColor} style={styles.icon} />
                      <Text style={[styles.detailText, { color: theme.text }]}>Supplier: {feed.supplier}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="cube-outline" size={20} color={theme.iconColor} style={styles.icon} />
                      <Text style={[styles.detailText, { color: theme.text }]}>Quantity: {feed.quantity}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="currency-usd" size={20} color={theme.iconColor} style={styles.icon} />
                      <Text style={[styles.detailText, { color: theme.text }]}>Cost: {feed.cost}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="calendar" size={20} color={theme.iconColor} style={styles.icon} />
                      <Text style={[styles.detailText, { color: theme.text }]}>Purchase Date: {feed.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="calendar-clock" size={20} color={theme.iconColor} style={styles.icon} />
                      <Text style={[styles.detailText, { color: theme.text }]}>Expire Date: {feed.expireDate}</Text>
                    </View>
                  </View>
              ))}
            </View>
        ))}
      </ScrollView>
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
});

export default FeedInventoryScreen;
