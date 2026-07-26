import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  // Mengambil padding area aman dari sistem Android / iOS
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { fontWeight: '800', color: '#0f172a' },
        tabBarIcon: ({ focused }) => {
          let icon = route.name === 'Home' ? '🏥' : '👤';
          return <Text style={{ fontSize: 22 }}>{icon}</Text>;
        },
        tabBarActiveTintColor: '#0284c7',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          // Menyesuaikan tinggi berdasarkan inset bottom sistem perangkat
          height: 65 + (insets.bottom > 0 ? insets.bottom : 15),
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 15,
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          elevation: 12,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Daftar Dokter' }} 
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileScreen} 
        options={{ title: 'Profil Pasien' }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        options={{ title: 'Pendaftaran Pasien' }} 
      />
      <Stack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen} 
        options={{ title: 'Reset Password' }} 
      />
      <Stack.Screen 
        name="EditProfileScreen" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profil Pasien' }} 
      />
      <Stack.Screen 
        name="MainTab" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BookingScreen" 
        component={BookingScreen} 
        options={{ title: 'Form Booking Konsultasi' }} 
      />
    </Stack.Navigator>
  );
}