import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Feather } from '@expo/vector-icons'; 

import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TabHomeScreen from '../screens/TabHomeScreen';
import TabSearchScreen from '../screens/TabSearchScreen';
import TabProfileScreen from '../screens/TabProfileScreen';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} options={{ headerShown: false}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {backgroundColor: '#2C2727'}
      }}
      >
      <BottomTab.Screen
        name="TabHome"
        component={TabHomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabHome'>) => ({
          title: '',
          showLabel: false,
          tabBarIcon: ({ color }) => <Feather name="home" size={30} color={color} />,
          header: () => null
        })}
      />
      <BottomTab.Screen
        name="TabSearch"
        component={TabSearchScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Feather name="search" size={30} color={color} />,
          header: () => null
        }}
      />
      <BottomTab.Screen
        name="TabProfile"
        component={TabProfileScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Feather name="user" size={30} color={color} />,
          header: () => null
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
