import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
type Task = {
  id: string;
  text: string;
};


const ActivityReportScreen = () => {
  const data = [
    { id: '1', name: 'Annie', lastActive: 'Dec 10, 3:00 PM', timeSpent: 3, totalTime: 8 },
    { id: '2', name: 'Oliver', lastActive: 'Dec 10, 4:00 PM', timeSpent: 5, totalTime: 8 },
    { id: '3', name: 'Mark', lastActive: 'Dec 11, 9:00 AM', timeSpent: 4, totalTime: 8 },
    { id: '4', name: 'Zoe', lastActive: 'Dec 11, 1:00 PM', timeSpent: 6, totalTime: 8 },
    { id: '5', name: 'Liam', lastActive: 'Dec 12, 10:00 AM', timeSpent: 7, totalTime: 8 },
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: taskText }]);
      setTaskText('');
    }
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.task}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: any) => {
    if (!item || !item.name || !item.lastActive || item.timeSpent === undefined || item.totalTime === undefined) {
      return <Text>Error loading data</Text>; 
    }
    const progress = (item.timeSpent / item.totalTime) * 100; 
    return (

      <View style={styles.row}>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.lastActive}</Text>
        <Text style={styles.cell}>{item.timeSpent} hrs</Text>
        <View style={styles.progressContainer}>
          <Svg width={screenWidth - 40} height={20}>
            <Rect
              x="0"
              y="0"
              width={(screenWidth - 40) * (progress / 100)/3}
              height="20"
              fill="rgba(0, 100, 162, 0.5)"
            />
            <Rect
              x={(screenWidth - 40) * (progress / 100)/3}
              y="0"
              width={(screenWidth - 40) * (progress / 100)/3}
              height="20"
              fill="rgba(134, 65, 244, 0.5)"
            />
            <Rect
              x={(screenWidth - 40) * 2 * (progress / 100)/3}
              y="0"
              width={(screenWidth - 40) * (progress / 100)/3}
              height="20"
              fill="rgba(0, 185, 206, 0.5)"
            />
            <Rect
              x={(screenWidth - 40) * (progress / 100)}
              y="0"
              width={(screenWidth - 40) * (1 - progress / 100)}
              height="20"
              fill="lightgray"
            />
          </Svg>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea..."
          value={taskText}
          onChangeText={setTaskText}
        />
        <Button title="Agregar" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.title}>Reporte de Actividades</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.table}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    paddingBottom: 20,
  },
  row: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  progressContainer: {
    flex: 3,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  list: {
    paddingBottom: 20,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ActivityReportScreen;
