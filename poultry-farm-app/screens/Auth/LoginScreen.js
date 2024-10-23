import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from '../../i18n';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const LoginScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.64.15:7070/realms/PoultryFarmSystem/protocol/openid-connect/token",
        new URLSearchParams({
          grant_type: "password",
          client_id: "poulty-farm-client",
          client_secret: "IZmAl1nctt5Tfsd5ClgyGM7O17kxZXG9",
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data)
      const { access_token, refresh_token } = response.data;

      // Store the tokens securely
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);

      // Decode the token to extract roles and email
      const decodedToken = jwtDecode(access_token);
      console.log("Decoded Token:", decodedToken); // Log the entire decoded token

      // Check if realm_access exists
      const roles = decodedToken.resource_access && decodedToken.resource_access["poulty-farm-client"]
          ? decodedToken.resource_access["poulty-farm-client"].roles
        : []; // Array of roles
      
      // Navigate based on role
      if (roles.includes("ADMIN")) {
        navigation.navigate("AdminDashboard");
      } else if (roles.includes("MANAGER")) {
        navigation.navigate("FarmManagerDashboard");
      } else if (roles.includes("VET")) {
        navigation.navigate("VetDashboard");
      } else {
        console.error("No roles found for the user.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert(t("error"), t("enter_username_password"));
      return;
    }
  };

  // const handleLogin = () => {
  //   if (username.trim() === '' || password.trim() === '') {
  //     Alert.alert(t('error'), t('enter_username_password'));
  //     return;
  //   }

  //   if (username === 'admin') {
  //     navigation.replace('AdminDashboard');
  //   } else if (username === 'farmmanager') {
  //     navigation.replace('FarmManagerDashboard');
  //   } else if (username === 'vet') {
  //     navigation.replace('VetDashboard');
  //   } else {
  //     Alert.alert(t('error'), t('invalid_credentials'));
  //   }
  // };

  const switchLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <MaterialCommunityIcons
              name={theme.mode === 'dark' ? 'weather-sunny' : 'weather-night'}
              size={30}
              color={theme.mode === 'dark' ? '#FFD700' : '#FFA500'}
          />
        </TouchableOpacity>

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
        <View style={styles.languageSwitcherContainer}>
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
    justifyContent: 'flex-end',
    padding: 16,
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
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
