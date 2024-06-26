import React, { Suspense } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Direct imports for screens
import SplashScreen from './screens/Auth/SplashScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import AdminDashboard from './screens/Admin/Admin_Dashboard';
import FarmDetailsScreen from './screens/Admin/Admin_FarmDetailsScreen';
import FarmDetailScreen from './screens/Admin/FarmDetails/FarmDetailScreen';
import BlockDetailsScreen from './screens/Admin/FarmDetails/BlockDetailsScreen';
import MonitoringScreen from './screens/Admin/FarmDetails/MonitoringScreen';
import ChickInventoryScreen from './screens/Admin/FarmDetails/ChickInventoryScreen';
import FeedInventoryScreen from './screens/Admin/FarmDetails/FeedInventoryScreen';
import MedicalInventoryScreen from './screens/Admin/FarmDetails/MedicalInventoryScreen';
import FinanceScreen from './screens/Admin/Admin_FinanceScreen';
import ReportScreen from './screens/Admin/Admin_ReportScreen';
import NotificationScreen from './screens/Admin/Admin_NotificationScreen';
import UserManagementScreen from './screens/Admin/Admin_UserManagementScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme.mode === 'dark' ? DarkTheme : DefaultTheme}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="FarmDetails" component={FarmDetailsScreen} options={{ title: 'Farm Details', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="FarmDetail" component={FarmDetailScreen} options={{ title: 'Farm Detail', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="BlockDetails" component={BlockDetailsScreen} options={{ title: 'Block Details', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="Monitoring" component={MonitoringScreen} options={{ title: 'Monitoring', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="ChickInventory" component={ChickInventoryScreen} options={{ title: 'Chick Inventory', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="FeedInventory" component={FeedInventoryScreen} options={{ title: 'Feed Inventory', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="MedicalInventory" component={MedicalInventoryScreen} options={{ title: 'Medical Inventory', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="Finance" component={FinanceScreen} options={{ title: 'Finance', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Report', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: 'Notification', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
          <Stack.Screen name="UserManagement" component={UserManagementScreen} options={{ title: 'User Management', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </ThemeProvider>
  );
};

export default App;