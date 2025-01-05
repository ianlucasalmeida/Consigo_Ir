import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

interface VehicleData {
  id: string;
  name: string;
  costPerKm: number;
  isPrimary?: boolean;
  consumption?: number;
  fuelType?: string;
}

interface LocationType {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation(); // Corrigido: Declaração do hook de navegação
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const vehicle: VehicleData = {
    id: '10101010',
    name: 'Sedan - ABC 1234',
    costPerKm: 0.85,
    isPrimary: true,
    consumption: 12,
    fuelType: 'Gasolina',
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        Alert.alert('Erro', 'É necessário permitir acesso à localização para usar o mapa.');
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg('Erro ao obter localização');
        Alert.alert('Erro', 'Não foi possível obter sua localização atual.');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ paddingTop: 16 }}>
          <Text style={styles.welcomeText}>Bem-vindo ao Consigo Ir?</Text>
          <Text style={styles.descriptionText}>Planeje sua viagem com estimativa de custos</Text>
        </View>
        <TouchableOpacity>
          <Image 
        source={{ uri: 'https://via.placeholder.com/40' }}
        style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Vehicle Card */}
      <TouchableOpacity style={styles.vehicleCard}>
        <View>
          <View style={styles.vehicleHeader}>
            <Text style={styles.vehicleLabel}>Veículo</Text>
            {vehicle.isPrimary && (
              <View style={styles.primaryBadge}>
                <Text style={styles.primaryText}>Principal</Text>
              </View>
            )}
          </View>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehicleLabel}>Custo por Km</Text>
          <Text style={styles.costPerKm}>R$ {vehicle.costPerKm.toFixed(2)}</Text>
          <Text style={styles.consumptionText}>
            Consumo: {vehicle.consumption} km/l ({vehicle.fuelType})
          </Text>
        </View>
        <Image 
          source={require('../../../assets/images/icon.png')} 
          style={styles.vehicleImage}
        />
      </TouchableOpacity>

      {/* View All Vehicles Button */}
      <TouchableOpacity 
        style={styles.viewAllButton} 
        onPress={() => navigation.navigate('buscaCarro')} // Corrigido: Rota simplificada para BuscaCarro
      >
        <Text style={styles.viewAllText}>Ver Todos os Veículos ›</Text>
      </TouchableOpacity>

      {/* Add New Vehicle Button */}
      <TouchableOpacity style={styles.addVehicleButton}>
        <Text style={styles.addVehicleText}>
          <Text style={styles.plusIcon}>+</Text> Adicionar novo veículo
        </Text>
      </TouchableOpacity>

      {/* Cost Calculator */}
      <Text style={styles.tollCalculatorTitle}>Calculadora de Custos</Text>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
            customMapStyle={darkMapStyle}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Sua localização"
              description="Você está aqui"
            />
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  vehicleCard: {
    backgroundColor: '#2962FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleLabel: {
    color: '#FFFFFF99',
    fontSize: 14,
  },
  primaryBadge: {
    backgroundColor: '#FFFFFF33',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  vehicleName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  costPerKm: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
  },
  consumptionText: {
    color: '#FFFFFF99',
    fontSize: 14,
    marginTop: 4,
  },
  vehicleImage: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
  },
  viewAllButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  addVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  addVehicleText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  plusIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tollCalculatorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
  mapContainer: {
    margin: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
});

export default HomeScreen;
