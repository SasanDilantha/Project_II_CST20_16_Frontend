import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FarmDetailsScreen from './Admin_FarmDetailsScreen';
import FinanceScreen from './Admin_FinanceScreen';
import ReportScreen from './Admin_ReportScreen';
import UserManagementScreen from './Admin_UserManagementScreen';
import NotificationScreen from './Admin_NotificationScreen';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions, Modal, Switch, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const SidePanel = ({ visible, onClose, navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const slideAnim = useState(new Animated.Value(width))[0];
  const [isEnabled, setIsEnabled] = useState(theme.mode === 'dark');

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  const handleLogout = () => {
    Alert.alert(
        t('logout'),
        t('logout_confirmation'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('logout'),
            onPress: () => navigation.replace('Login'),
          },
        ],
        { cancelable: true }
    );
  };

  const handleViewRecords = () => {
    navigation.navigate('PastRecords');
    onClose();
  };

  const switchLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
      <Modal
          animationType="none"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.sidePanel, { transform: [{ translateX: slideAnim }], backgroundColor: theme.background }]}>
                <View style={styles.sidePanelHeader}>
                  <Text style={[styles.sidePanelTitle, { color: theme.text }]}>{t('admin')}</Text>
                  <TouchableOpacity onPress={onClose} style={styles.menuIconContainer}>
                    <MaterialIcons name="menu" size={24} color={theme.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileContainer}>
                  <Image
                      source={require('../../assets/admin_profile.png')}
                      style={styles.profileImage}
                  />
                  <Text style={[styles.profileText, { color: theme.text }]}>John Doe</Text>
                  <Text style={[styles.profileText, { color: theme.text }]}>john.doe@example.com</Text>
                </View>
                <View style={styles.themeToggleContainer}>
                  <Text style={[styles.sidePanelTitle, { color: theme.text }]}>{t('switch_theme')}</Text>
                  <Switch
                      trackColor={{ false: "#767577", true: theme.primary }}
                      thumbColor={isEnabled ? theme.primary : "#f4f3f4"}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                  />
                </View>
                <TouchableOpacity onPress={handleViewRecords} style={[styles.recordsButton, { backgroundColor: theme.primary }]}>
                  <Text style={[styles.recordsButtonText, { color: theme.text }]}>{t('view_past_records')}</Text>
                </TouchableOpacity>
                <View style={styles.flexSpacer} />

                {/* Custom Language Switcher */}
                <View style={[styles.languageSwitcher, { borderColor: theme.primary }]}>
                  <TouchableOpacity
                      style={[styles.languageOption, i18n.language === 'en' ? { backgroundColor: theme.primary } : { backgroundColor: theme.inputBackground }]}
                      onPress={() => switchLanguage('en')}
                  >
                    <Text style={[styles.languageText, { color: theme.text }]}>{t('en')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[styles.languageOption, i18n.language === 'si' ? { backgroundColor: theme.primary } : { backgroundColor: theme.inputBackground }]}
                      onPress={() => switchLanguage('si')}
                  >
                    <Text style={[styles.languageText, { color: theme.text }]}>{t('si')}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: theme.primary }]}>
                  <Text style={[styles.logoutButtonText, { color: theme.text }]}>{t('logout')}</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
};

const AdminDashboard = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelVisible(!isSidePanelVisible);
  };

  return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
            initialRouteName="FarmDetails"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size, focused }) => {
                let iconName;

                if (route.name === 'FarmDetails') {
                  iconName = 'home';
                } else if (route.name === 'Finance') {
                  iconName = 'attach-money';
                } else if (route.name === 'Report') {
                  iconName = 'bar-chart';
                } else if (route.name === 'UserManagement') {
                  iconName = 'person';
                } else if (route.name === 'Notification') {
                  iconName = 'notifications';
                }

                return (
                    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
                      <MaterialIcons name={iconName} size={focused ? size * 1.2 : size} color={color} />
                    </View>
                );
              },
              tabBarActiveTintColor: theme.primary,
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                backgroundColor: theme.background,
              },
              headerStyle: {
                backgroundColor: theme.background,
              },
              headerTintColor: theme.text,
              headerRight: () => (
                  <TouchableOpacity onPress={toggleSidePanel} style={styles.menuIconContainer}>
                    <MaterialIcons name="menu" size={24} color={theme.primary} />
                  </TouchableOpacity>
              ),
            })}
        >
          <Tab.Screen
              name="Finance"
              component={FinanceScreen}
              options={{ title: t('finance') }}
          />
          <Tab.Screen
              name="Report"
              component={ReportScreen}
              options={{ title: t('report') }}
          />
          <Tab.Screen
              name="FarmDetails"
              component={FarmDetailsScreen}
              options={{ title: t('farm_details') }}
          />
          <Tab.Screen
              name="UserManagement"
              component={UserManagementScreen}
              options={{ title: t('user_management') }}
          />
          <Tab.Screen
              name="Notification"
              component={NotificationScreen}
              options={{ title: t('notification') }}
          />
        </Tab.Navigator>
        <SidePanel visible={isSidePanelVisible} onClose={toggleSidePanel} navigation={navigation} />
      </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFocused: {
    transform: [{ scale: 1.6 }],
  },
  sidePanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    padding: 20,
  },
  sidePanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidePanelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  menuIconContainer: {
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 4,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  recordsButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  recordsButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  flexSpacer: {
    flex: 1,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  languageSwitcher: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    alignSelf: 'center',
    width: 120,
    height: 40,
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

export default AdminDashboard;
