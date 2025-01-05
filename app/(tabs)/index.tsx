import { StyleSheet, Image, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
        <ThemedText type="title" style={styles.headerText}>
          Bem-vindo!
        </ThemedText>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Inicie sua aplicação aqui:
        </ThemedText>
        <ThemedText>
          Comece a programar adicionando mais funcionalidades à sua página inicial.
        </ThemedText>
        <ThemedText>
          Edite o arquivo{' '}
          <ThemedText type="defaultSemiBold">(tabs)/index.tsx</ThemedText> para implementar suas
          ideias.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    marginTop: 16,
  },
  reactLogo: {
    width: 150,
    height: 150,
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});
