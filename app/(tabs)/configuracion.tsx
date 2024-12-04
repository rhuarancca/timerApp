import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';

// Interfaz de configuración
const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');

  const toggleNotifications = () => setNotifications((previousState) => !previousState);
  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
  const toggleLanguage = () => setLanguage((prevLang) => (prevLang === 'es' ? 'en' : 'es'));

  const resetApp = () => {
    // Aquí puedes añadir la lógica para restablecer la app (ejemplo, limpiar el almacenamiento local)
    Alert.alert('Restablecer', 'La aplicación ha sido restablecida');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>

      {/* Configuración de Notificaciones */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notificaciones</Text>
        <Switch value={notifications} onValueChange={toggleNotifications} />
      </View>

      {/* Configuración de Modo Oscuro */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Modo Oscuro</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Configuración de Idioma */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Idioma</Text>
        <Button title={`Cambiar a ${language === 'es' ? 'Inglés' : 'Español'}`} onPress={toggleLanguage} />
      </View>

      {/* Botón de Restablecer */}
      <View style={styles.resetButton}>
        <Button title="Restablecer aplicación" onPress={resetApp} color="#d9534f" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: '#333',
  },
  resetButton: {
    marginTop: 30,
  },
});

export default SettingsScreen;
