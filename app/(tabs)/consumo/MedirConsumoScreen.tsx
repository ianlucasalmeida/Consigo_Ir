import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MedirConsumoScreen() {
  const [veiculo, setVeiculo] = useState('');
  const [localizacao, setLocalizacao] = useState({
    latitude: -8.0476,
    longitude: -34.8770,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcular Consumo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Veículo"
        value={veiculo}
        onChangeText={setVeiculo}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar Veículo</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={localizacao}
        onRegionChangeComplete={(region) => setLocalizacao(region)}
      >
        <Marker coordinate={localizacao} title="Local Atual" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },
});
