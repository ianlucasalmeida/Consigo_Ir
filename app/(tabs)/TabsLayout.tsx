import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones
import HomeScreen from './home/HomeScreen';
import MedirConsumoScreen from './consumo/MedirConsumoScreen';
import buscaCarro from './busca_carro/buscaCarro';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#3b82f6', height: 60 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#cbd5e1',
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = 'home'; // Ícone de casa
          } else if (route.name === 'Medir Consumo') {
            iconName = 'ios-fuel'; // Ícone de bomba de combustível
          }
          else if (route.name === 'Busca Carro') {
            iconName = 'ios-car'; // Ícone de carro
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medir Consumo" component={MedirConsumoScreen} />
      <Tab.Screen name="Busca Carro" component={buscaCarro} />
    </Tab.Navigator>
  );
}
