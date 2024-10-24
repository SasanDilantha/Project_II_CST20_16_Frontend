import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions, Modal, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import Vet_ReportScreen from './Vet_ReportScreen';
import Vet_FarmListScreen from './Vet_FarmListScreen';
import Vet_NotificationScreen from './Vet_NotificationScreen';

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

    const switchLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const handleViewRecords = () => {
        navigation.navigate('PastRecords');
        onClose();
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
                                <Text style={[styles.sidePanelTitle, { color: theme.text }]}>{t('vet_dashboard')}</Text>
                                <TouchableOpacity onPress={onClose} style={styles.menuIconContainer}>
                                    <MaterialIcons name="menu" size={24} color={theme.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileContainer}>
                                <Image
                                    source={require('../../assets/icon.png')} // Replace with your profile image URL
                                    style={styles.profileImage}
                                />
                                <Text style={[styles.profileText, { color: theme.text }]}>John Doe</Text>
                                <Text style={[styles.profileText, { color: theme.text }]}>john.doe@example.com</Text>
                            </View>

                            {/* Theme Toggle with Sun and Moon Icons */}
                            <View style={styles.themeToggleContainer}>
                                <Text style={[styles.sidePanelTitle, { color: theme.text }]}>{t('switch_theme')}</Text>
                                <TouchableOpacity onPress={toggleSwitch} style={styles.iconButton}>
                                    <MaterialCommunityIcons
                                        name={isEnabled ? "weather-night" : "weather-sunny"}
                                        size={30}
                                        color={isEnabled ? "#FFD700" : "#FFA500"}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={handleViewRecords} style={[styles.recordsButton, { backgroundColor: theme.primary }]}>
                                <Text style={[styles.recordsButtonText, { color: theme.text }]}>{t('view_past_records')}</Text>
                            </TouchableOpacity>

                            {/* Custom Language Switcher */}
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

                            <View style={styles.flexSpacer} />

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

const VetDashboard = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);

    const toggleSidePanel = () => {
        setIsSidePanelVisible(!isSidePanelVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="VetFarmList"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size, focused }) => {
                        let iconName;

                        if (route.name === 'VetReport') {
                            iconName = 'bar-chart';
                        } else if (route.name === 'VetFarmList') {
                            iconName = 'home';
                        } else if (route.name === 'VetNotification') {
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
                <Tab.Screen name="VetReport" component={Vet_ReportScreen} options={{ title: t('report') }} />
                <Tab.Screen name="VetFarmList" component={Vet_FarmListScreen} options={{ title: t('farm_list') }} />
                <Tab.Screen name="VetNotification" component={Vet_NotificationScreen} options={{ title: t('notification') }} />
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
    iconButton: {
        padding: 5,
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

export default VetDashboard;
