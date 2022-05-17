/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
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

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
