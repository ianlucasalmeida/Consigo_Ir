import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';

interface Marca {
  codigo: string;
  nome: string;
}

interface Modelo {
  codigo: string;
  nome: string;
}

interface Veiculo {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

const FIPE_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

const BuscaCarro = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [anos, setAnos] = useState<Modelo[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null);
  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null);
  const [selectedAno, setSelectedAno] = useState<Modelo | null>(null);
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${FIPE_BASE_URL}/carros/marcas`);
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModelos = async (marcaId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${FIPE_BASE_URL}/carros/marcas/${marcaId}/modelos`);
      const data = await response.json();
      setModelos(data.modelos);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnos = async (marcaId: string, modeloId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${FIPE_BASE_URL}/carros/marcas/${marcaId}/modelos/${modeloId}/anos`);
      const data = await response.json();
      setAnos(data);
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVeiculo = async (marcaId: string, modeloId: string, anoId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${FIPE_BASE_URL}/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`
      );
      const data = await response.json();
      setVeiculo(data);
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMarcas = marcas.filter(marca => 
    marca.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredModelos = modelos.filter(modelo =>
    modelo.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleMarcaSelect = (marca: Marca) => {
    setSelectedMarca(marca);
    setSelectedModelo(null);
    setSelectedAno(null);
    setVeiculo(null);
    fetchModelos(marca.codigo);
    setSearchText('');
  };

  const handleModeloSelect = (modelo: Modelo) => {
    setSelectedModelo(modelo);
    setSelectedAno(null);
    setVeiculo(null);
    if (selectedMarca) {
      fetchAnos(selectedMarca.codigo, modelo.codigo);
    }
    setSearchText('');
  };

  const handleAnoSelect = (ano: Modelo) => {
    setSelectedAno(ano);
    if (selectedMarca && selectedModelo) {
      fetchVeiculo(selectedMarca.codigo, selectedModelo.codigo, ano.codigo);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca de Veículos</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite para buscar..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading && <ActivityIndicator size="large" color="#2962FF" />}

      {!selectedMarca && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione a Marca</Text>
          <FlatList
            data={filteredMarcas}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleMarcaSelect(item)}
              >
                <Text style={styles.itemText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {selectedMarca && !selectedModelo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione o Modelo</Text>
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => setSelectedMarca(null)}
          >
            <Text style={styles.selectedItemText}>Marca: {selectedMarca.nome}</Text>
          </TouchableOpacity>
          <FlatList
            data={filteredModelos}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleModeloSelect(item)}
              >
                <Text style={styles.itemText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {selectedMarca && selectedModelo && !selectedAno && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione o Ano</Text>
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => setSelectedModelo(null)}
          >
            <Text style={styles.selectedItemText}>
              {selectedMarca.nome} - {selectedModelo.nome}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={anos}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleAnoSelect(item)}
              >
                <Text style={styles.itemText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {veiculo && (
        <View style={styles.veiculoCard}>
          <Text style={styles.veiculoTitle}>{veiculo.Marca} {veiculo.Modelo}</Text>
          <Text style={styles.veiculoInfo}>Ano: {veiculo.AnoModelo}</Text>
          <Text style={styles.veiculoInfo}>Combustível: {veiculo.Combustivel}</Text>
          <Text style={styles.veiculoInfo}>Valor: {veiculo.Valor}</Text>
          <Text style={styles.veiculoInfo}>Código FIPE: {veiculo.CodigoFipe}</Text>
          <Text style={styles.veiculoInfo}>Referência: {veiculo.MesReferencia}</Text>
          
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setSelectedMarca(null);
              setSelectedModelo(null);
              setSelectedAno(null);
              setVeiculo(null);
            }}
          >
            <Text style={styles.resetButtonText}>Nova Busca</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  item: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedItem: {
    padding: 16,
    backgroundColor: '#2962FF',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  veiculoCard: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginTop: 16,
  },
  veiculoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  veiculoInfo: {
    fontSize: 16,
    color: '#FFFFFF99',
    marginBottom: 4,
  },
  resetButton: {
    backgroundColor: '#2962FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuscaCarro;