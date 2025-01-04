import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function MedirConsumoScreen() {
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [result, setResult] = useState<{ litersUsed: number; cost: number } | null>(null);

  const handleCalculate = () => {
    const distanceNum = parseFloat(distance);
    const efficiencyNum = parseFloat(efficiency);
    const fuelPriceNum = parseFloat(fuelPrice);

    if (!isNaN(distanceNum) && !isNaN(efficiencyNum) && !isNaN(fuelPriceNum)) {
      const litersUsed = distanceNum / efficiencyNum;
      const cost = litersUsed * fuelPriceNum;
      setResult({ litersUsed, cost });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcular Consumo</Text>
      <TextInput
        style={styles.input}
        placeholder="Distância (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Consumo do veículo (km/L)"
        keyboardType="numeric"
        value={efficiency}
        onChangeText={setEfficiency}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do combustível (R$/L)"
        keyboardType="numeric"
        value={fuelPrice}
        onChangeText={setFuelPrice}
      />
      <Button title="Calcular" onPress={handleCalculate} />
      {result && (
        <View style={styles.result}>
          <Text>Litros consumidos: {result.litersUsed.toFixed(2)} L</Text>
          <Text>Custo total: R$ {result.cost.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  result: { marginTop: 20 },
});
