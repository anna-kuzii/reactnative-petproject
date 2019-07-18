// @flow

import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodayScreen from './screens/today';
import HourlyScreen from './screens/hourly';
import WeekendScreen from './screens/weekend';
import AllergyScreen from './screens/allergy';
import FarmingScreen from './screens/farming';

const Today = value => ({
  screen: () => <TodayScreen {...value} />,
  navigationOptions: {
    tabBarLabel: 'Today',
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <MaterialIcon name="today" color={tintColor} size={24} />
    ),
  },
});

const Hourly = value => ({
  screen: () => <HourlyScreen {...value} />,
  navigationOptions: {
    tabBarLabel: 'Hourly',
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <FeatherIcon name="clock" color={tintColor} size={24} />
    ),
  },
});

const Weekend = value => ({
  screen: () => <WeekendScreen {...value} />,
  navigationOptions: {
    tabBarLabel: 'Weekend',
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <FontAwesomeIcon name="calendar" color={tintColor} size={24} />
    ),
  },
});

const Farming = value => ({
  screen: () => <FarmingScreen {...value} />,
  navigationOptions: {
    tabBarLabel: 'Farming',
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <MaterialCommunityIcon name="worker" color={tintColor} size={24} />
    ),
  },
});

const Allergy = value => ({
  screen: () => <AllergyScreen {...value} />,
  navigationOptions: {
    tabBarLabel: 'Allergy',
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <FontAwesome5Icon name="allergies" color={tintColor} size={24} />
    ),
  },
});

export default (value: any) =>
  createMaterialBottomTabNavigator(
    {
      Today: Today(value),
      Hourly: Hourly(value),
      Weekend: Weekend(value),
      Farming: Farming(value),
      Allergy: Allergy(value),
    },
    {
      initialRouteName: 'Today',
      activeTintColor: 'white',
      barStyle: { backgroundColor: '#000' },
      shifting: false,
    },
  );
