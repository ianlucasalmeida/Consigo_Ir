import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home/home';
import MedirConsumoScreen from './consumo/medirConsumo';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medir Consumo" component={MedirConsumoScreen} />
    </Tab.Navigator>
  );
}
