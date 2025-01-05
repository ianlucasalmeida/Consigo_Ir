import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function MedirConsumoScreen() {
  const [distancia, setDistancia] = useState('');
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularConsumo = () => {
    const distanciaNum = parseFloat(distancia);
    const precoNum = parseFloat(precoCombustivel);
    const gasto = distanciaNum * precoNum; // Exemplo de cálculo simples
    setResultado(`Custo estimado: R$ ${gasto.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcular Consumo</Text>
      <TextInput
        style={styles.input}
        placeholder="Distância (km)"
        keyboardType="numeric"
        value={distancia}
        onChangeText={setDistancia}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do combustível (R$/L)"
        keyboardType="numeric"
        value={precoCombustivel}
        onChangeText={setPrecoCombustivel}
      />
      <TouchableOpacity style={styles.button} onPress={calcularConsumo}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  result: {
    fontSize: 18,
    color: '#10b981',
    marginTop: 16,
  },
});
