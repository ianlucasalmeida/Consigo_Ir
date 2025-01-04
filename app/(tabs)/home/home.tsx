import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com o saldo e boas-vindas */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bem-vindo, Condutor!</Text>
        <Text style={styles.balance}>Saldo disponível: R$ 1.000</Text>
      </View>

      {/* Card de veículo principal */}
      <View style={styles.vehicleCard}>
        <Text style={styles.vehicleInfo}>Veículo Principal</Text>
        <Text style={styles.vehicleDetails}>Placa: ABC-1234</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Atalhos */}
      <View style={styles.shortcutsContainer}>
        <TouchableOpacity style={styles.shortcutButton}>
          <Text style={styles.shortcutText}>Adicionar Veículo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutButton}>
          <Text style={styles.shortcutText}>Calcular Consumo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutButton}>
          <Text style={styles.shortcutText}>Comparar Combustíveis</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  header: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balance: {
    fontSize: 16,
    color: '#A5A5A5',
    marginTop: 4,
  },
  vehicleCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1E88E5',
    borderRadius: 8,
  },
  vehicleInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  vehicleDetails: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 4,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1565C0',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  shortcutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    alignItems: 'center',
  },
  shortcutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
