import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions, Switch } from 'react-native';

type Registro = {
  id: string;
  tiempo: string;
};

type RegistroUser = {
  id: string;
  nombre: string;
  edad: number;
  color: string;
  completado: boolean;
};

const { width, height } = Dimensions.get('window');

export default function CronometroScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [registrosUser, setRegistrosUser] = useState<RegistroUser[]>([
    { id: '1', nombre: 'Juan Pérez', edad: 30, color: '#FF6347', completado: false },
    { id: '2', nombre: 'Ana Gómez', edad: 25, color: '#4CAF50', completado: false },
    { id: '3', nombre: 'Carlos Rodríguez', edad: 35, color: '#2196F3', completado: false },
    { id: '4', nombre: 'María Sánchez', edad: 28, color: '#FFD700', completado: false },
  ]);

  const toggleCompletion = (id: string) => {
    setRegistrosUser((prevRegistros) =>
      prevRegistros.map((registroUser) =>
        registroUser.id === id ? { ...registroUser, completado: !registroUser.completado } : registroUser
      )
    );
  };

  const renderItem = ({ item }: { item: RegistroUser }) => (
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

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const tiempoFormateado = formatTime(time);
      setRegistros([...registros, { id: Date.now().toString(), tiempo: tiempoFormateado }]);
    }
  };

  const resetTimer = () => {
    setTime(0);
    if (isRunning) {
      stopTimer();
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderRegistro = ({ item }: { item: Registro }) => (
    <View style={styles.registro}>
      <Text style={styles.registroText}>Registro: {item.tiempo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.time}>{formatTime(time)}</Text>

      <View style={styles.buttonsContainer}>
        <Button title={isRunning ? 'Pausar' : 'Iniciar'} onPress={isRunning ? stopTimer : startTimer} />
        <Button title="Reiniciar" onPress={resetTimer} />
      </View>

      <Text style={styles.subTitle}>Registros</Text>
      <FlatList
        data={registros}
        renderItem={renderRegistro}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.registrosList}
      />
      <View style={styles.container2}>
      <FlatList
        data={registrosUser}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  title: {
    fontSize: width > 600 ? 32 : 24, 
    marginBottom: 20,
  },
  timer: {
    fontSize: width > 600 ? 60 : 48, 
    marginBottom: 0,
  },
  buttonsContainer: {
    width: width > 600 ? '50%' : '80%',
    marginBottom: 0,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  registrosList: {
    paddingBottom: 0,
  },
  registro: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  registroText: {
    fontSize: 16,
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
