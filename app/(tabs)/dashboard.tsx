import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type Employee = {
  id: string;
  name: string;
  totalSecondsWorked: number;
  isWorking: boolean;
};

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Juan Pérez', totalSecondsWorked: 0, isWorking: false },
    { id: '2', name: 'Ana Gómez', totalSecondsWorked: 0, isWorking: false },
    { id: '3', name: 'Carlos Rodríguez', totalSecondsWorked: 0, isWorking: false },
    { id: '4', name: 'María Sánchez', totalSecondsWorked: 0, isWorking: false },
  ]);

  const timers = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const startTimer = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, isWorking: true } : emp
      )
    );

    timers.current[id] = setInterval(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === id ? { ...emp, totalSecondsWorked: emp.totalSecondsWorked + 1 } : emp
        )
      );
    }, 1000);
  };


  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderEmployee = ({ item }: { item: Employee }) => (
    <View style={styles.employee}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.hours}>Horas trabajadas: {formatTime(item.totalSecondsWorked)}</Text>


    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Empleados - Horas Trabajadas</Text>

      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  employee: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hours: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
