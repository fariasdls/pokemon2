import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Picker, TouchableOpacity } from 'react-native';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        setPokemons(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPokemonTypes = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        setPokemonTypes(data.results);
      } catch (err) {
        setError(err);
      }
    };

    fetchPokemons();
    fetchPokemonTypes();
  }, []);

  const filterPokemonsByType = (type) => {
    if (type === 'all') {
      return pokemons;
    }

    // Simulate type filtering
    // This will be improved once Pokémon type data is fully integrated.
    return pokemons.filter(pokemon => pokemon.name.includes(type));
  };

  if (loading) return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  if (error) return <Text style={styles.error}>Error fetching data: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokémon Lista</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
        >
          <Picker.Item label="All Types" value="all" />
          {pokemonTypes.map((type) => (
            <Picker.Item key={type.name} label={type.name} value={type.name} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filterPokemonsByType(selectedType)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00796b',
    textAlign: 'center',
    marginVertical: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#00796b',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#00796b',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#d32f2f',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: '600',
  },
});

export default App;
