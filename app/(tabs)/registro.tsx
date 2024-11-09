import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

type Registro = {
  id: string;
  tiempo: string;
};

export default function CronometroScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  registrosList: {
    paddingBottom: 20,
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
});
