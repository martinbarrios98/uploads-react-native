import axios from 'axios';
import React from 'react';
import { Text, View, Alert } from 'react-native';
import { Headline, Subheading, Button } from 'react-native-paper'

import { estilos, reutilizables } from '../src/styles';

const DetallesClientes = ({ navigation, route }) => {

  const { item, setConsultar } = route.params;

  const elimiarCliente = async () => {

    Alert.alert(
      '¿ Desear eliminar este cliente ?',
      'No se podra deshacer esta acción',
      [
        {text: 'Cancel'},
        {text: 'Si, eliminar', onPress: async () => {
          try {
            await axios.delete(`http://localhost:3000/clientes/${item.id}`);
            setConsultar(true);
            navigation.navigate('Inicio');
          } catch (error) {
            console.log(error);
          }
        }}
      ]
    )

  }

  const editarCliente = () => {
    navigation.navigate('NuevoCliente', {
      clienteEditar: item,
      setConsultar 
    });
  }

  return (
    <View style={reutilizables.contenedor} >
      <Headline style={reutilizables.headline} > {item.nombre} </Headline>

      <Text
        style={estilos.texto}
      >
        Empresa: <Subheading>{item.empresa}</Subheading>
      </Text>
      <Text
        style={estilos.texto}
      >
        Correo: <Subheading>{item.correo}</Subheading>
      </Text>
      <Text
        style={estilos.texto}
      >
        Telefono: <Subheading>{item.telefono}</Subheading>
      </Text>
      <Button
          mode='contained'
          icon='cancel'
          style={{
            backgroundColor: 'red',
            marginTop: 10
          }}
          onPress={() => elimiarCliente() }
      >
          Eliminar
      </Button>
      <Button
          mode='contained'
          icon='pencil'
          style={{
            marginTop: 10
          }}
          onPress={ () => editarCliente() }
      >
        Editar
      </Button>
    </View>
  );
};

export default DetallesClientes;
