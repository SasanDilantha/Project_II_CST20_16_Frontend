// screens/Auth/LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert(t('error'), t('enter_username_password'));
      return;
    }

    if (username === 'admin') {
      navigation.replace('AdminDashboard');
    } else if (username === 'farmmanager') {
      navigation.replace('FarmManagerDashboard');
    } else if (username === 'vet') {
      navigation.replace('VetDashboard');
    } else {
      Alert.alert(t('error'), t('invalid_credentials'));
    }
  };

  const switchLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.mainContent}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={[styles.title, { color: theme.text }]}>{t('login')}</Text>
          <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.borderColor }]}
              placeholder={t('username')}
              placeholderTextColor={theme.text}
              value={username}
              onChangeText={setUsername}
          />
          <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.borderColor }]}
              placeholder={t('password')}
              placeholderTextColor={theme.text}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
          />
          <Button title={t('login')} onPress={handleLogin} color={theme.primary} />
        </View>

        {/* Custom Language Switcher */}
        <View style={[styles.languageSwitcherContainer]}>
          <View style={[styles.languageSwitcher, { borderColor: theme.primary }]}>
            <TouchableOpacity
                style={[styles.languageOption, i18n.language === 'en' ? { backgroundColor: theme.primary } : { backgroundColor: theme.inputBackground }]}
                onPress={() => switchLanguage('en')}
            >
              <Text style={[styles.languageText, { color: theme.text }]}>En</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.languageOption, i18n.language === 'si' ? { backgroundColor: theme.primary } : { backgroundColor: theme.inputBackground }]}
                onPress={() => switchLanguage('si')}
            >
              <Text style={[styles.languageText, { color: theme.text }]}>සිං</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',  // This will allow the content to move up slightly
    padding: 16,
  },
  mainContent: {
    flex: 1,  // This will take up most of the space and push the language switcher down
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,  // Pushes the main content slightly up
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
  languageSwitcherContainer: {

    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  languageSwitcher: {
    flexDirection: 'row',
    width: 120,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',

  },
  languageOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  languageText: {
    fontSize: 16,
  },
});

export default LoginScreen;
