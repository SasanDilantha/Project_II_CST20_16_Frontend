import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    // Handle the login logic here
    navigation.replace('AdminDashboard');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    Alert.alert('Forgot Password', 'Forgot Password functionality to be implemented');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={[styles.title, { color: theme.text }]}>Login</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.borderColor }]}
        placeholder="Username"
        placeholderTextColor={theme.text}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.borderColor }]}
        placeholder="Password"
        placeholderTextColor={theme.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color={theme.primary} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={[styles.forgotPassword, { color: theme.secondary }]}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
  forgotPassword: {
    marginTop: 16,
    fontSize: 14,
  },
});

export default LoginScreen;
