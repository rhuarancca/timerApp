import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, Switch } from 'react-native';

type Registro = {
  id: string;
  nombre: string;
  edad: number;
  color: string;
  completado: boolean;
};

export default function App() {
  const [registros, setRegistros] = useState<Registro[]>([
    { id: '1', nombre: 'Juan Pérez', edad: 30, color: '#FF6347', completado: false },
    { id: '2', nombre: 'Ana Gómez', edad: 25, color: '#4CAF50', completado: false },
    { id: '3', nombre: 'Carlos Rodríguez', edad: 35, color: '#2196F3', completado: false },
    { id: '4', nombre: 'María Sánchez', edad: 28, color: '#FFD700', completado: false },
  ]);

  const toggleCompletion = (id: string) => {
    setRegistros((prevRegistros) =>
      prevRegistros.map((registro) =>
        registro.id === id ? { ...registro, completado: !registro.completado } : registro
      )
    );
  };

  const renderItem = ({ item }: { item: Registro }) => (
    <View
      style={[
        styles.item,
        { borderColor: item.completado ? '#FF6347' : '#4CAF50' }, 
      ]}
    >
      <Text style={[styles.text, item.completado && styles.completed]}>
        Nombre: {item.nombre}
      </Text>
      <Text style={[styles.text, item.completado && styles.completed]}>
        Edad: {item.edad}
      </Text>
      <Switch
        value={item.completado}
        onValueChange={() => toggleCompletion(item.id)}
        trackColor={{ false: '#767577', true: '#767577' }} // Color de fondo del switch
        style={styles.switch}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={registros}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f4f4f4',
  },
  item: {
    padding: 20,
    borderWidth: 2, 
    borderRadius: 8, 
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  switch: {
    marginLeft: 10,
  },
});
