import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './(tabs)/home/home';
import MedirConsumoScreen from './(tabs)/consumo/medirConsumo';
import buscaCarro from './(tabs)/busca_carro/buscaCarro';
import { Ionicons } from '@expo/vector-icons';
import { BsFillFuelPumpFill } from "react-icons/bs";

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
            iconName = 'BsFillFuelPumpFill'; // Ícone de bomba de combustível
          }
          else if (route.name === 'Busca Carro') {
            iconName = 'car'; // Ícone de carro
          }

          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medir Consumo" component={MedirConsumoScreen} />
      <Tab.Screen name="Busca Carro" component={buscaCarro} />
    </Tab.Navigator>
  );
}
