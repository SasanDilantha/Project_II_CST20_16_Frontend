// screens/Vet/VetDashboard.js

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet, Text, Animated, Dimensions, Modal, Switch, Image, Alert } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Vet_ReportScreen from './Vet_ReportScreen';
import Vet_FarmListScreen from './Vet_FarmListScreen';
import Vet_NotificationScreen from './Vet_NotificationScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const SidePanel = ({ visible, onClose, navigation }) => {
    const { theme, toggleTheme } = useTheme();
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
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => navigation.replace('Login'),
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <Animated.View style={[styles.sidePanel, { transform: [{ translateX: slideAnim }], backgroundColor: theme.background }]}>
                    <View style={styles.sidePanelHeader}>
                        <Text style={[styles.sidePanelTitle, { color: theme.text }]}>Vet</Text>
                        <TouchableOpacity onPress={onClose} style={styles.menuIconContainer}>
                            <MaterialIcons name="menu" size={24} color={theme.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../../assets/vet_profile.png')} // Replace with your profile image URL
                            style={styles.profileImage}
                        />
                        <Text style={[styles.profileText, { color: theme.text }]}>John Doe</Text>
                        <Text style={[styles.profileText, { color: theme.text }]}>john.doe@example.com</Text>
                    </View>
                    <View style={styles.themeToggleContainer}>
                        <Text style={[styles.sidePanelTitle, { color: theme.text }]}>Switch Theme</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: theme.primary }}
                            thumbColor={isEnabled ? theme.primary : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={styles.flexSpacer} />
                    <TouchableOpacity onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: theme.primary }]}>
                        <Text style={[styles.logoutButtonText, { color: theme.text }]}>Logout</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const VetDashboard = ({ navigation }) => {
    const { theme } = useTheme();
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
                <Tab.Screen name="VetReport" component={Vet_ReportScreen} options={{ title: 'Report' }} />
                <Tab.Screen name="VetFarmList" component={Vet_FarmListScreen} options={{ title: 'Farm List' }} />
                <Tab.Screen name="VetNotification" component={Vet_NotificationScreen} options={{ title: 'Notification' }} />
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
    },
    flexSpacer: {
        flex: 1,
    },
    logoutButton: {
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default VetDashboard;
