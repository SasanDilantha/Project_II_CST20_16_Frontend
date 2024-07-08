import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 5000);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={[styles.text, { color: theme.primary }]}>Poultry Farm Management</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
  },
});

export default SplashScreen;
