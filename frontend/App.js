import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.236.154:3000/obtenerDatos')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Datos desde el servidor Node.js:</Text>
      {data.map((item) => (
        <View key={item.id}>
          <Text>ID: {item.id}</Text>
          <Text>Nombre: {item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default App;
