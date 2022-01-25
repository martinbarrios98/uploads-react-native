import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Alert, Platform } from 'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';

import { reutilizables, estilos } from '../src/styles'; 

const NuevoCliente = ({navigation, route}) => {

  const { setConsultar } = route.params;
  const { clienteEditar } = route.params;

  const [ cliente, setCliente ] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    empresa: ''
  });

  const { nombre, correo, telefono, empresa } = cliente;

  useEffect( () => {

    if(!clienteEditar) return;

    setCliente({
      ...clienteEditar
    })

  }, [clienteEditar]);

  const handleGuardarCliente = async () => {
    
    if(Object.values(cliente).includes('')) return Alert.alert(
      'Error',
      'Todos los campos son obligatorios',
      'Ok'
    );

    if(clienteEditar.id) {

      try {

        await axios.put(`http://localhost:3000/clientes/${clienteEditar.id}`, cliente);
        
        setCliente({
          nombre: '',
          telefono: '',
          correo: '',
          empresa: ''
        });
  
        setConsultar(true);
  
        //Redireccionar
        navigation.navigate('Inicio');
  
      } catch (error) {
        console.log(error);
      }


      return;
    }

    try {
      if(Platform.OS === 'ios'){
        await axios.post('http://localhost:3000/clientes', cliente);
      }else{
        await axios.post('http://10.0.2.2:3000/clientes', cliente);
      }
      
      setCliente({
        nombre: '',
        telefono: '',
        correo: '',
        empresa: ''
      });

      setConsultar(true);

      //Redireccionar
      navigation.navigate('Inicio');

    } catch (error) {
      console.log(error);
    }

  }

  return(
    <View
      style={reutilizables.contenedor} 
    >
      <Headline
        style={reutilizables.headline}
      >{ clienteEditar?.id ? `Editar ${clienteEditar?.nombre}` : 'Añadir Nuevo Cliente'}</Headline>

      <View>
        <TextInput 
          label="Nombre"
          placeholder='Ingresa tu nombre, ej. Martin'
          style={estilos.inputs}
          onChangeText={ nombre => setCliente({
            ...cliente,
            nombre
          })}
          value={nombre}
        />
        <TextInput 
          label="Telefono"
          placeholder='Ingresa tu telefono, ej. 888 888 88 88'
          style={estilos.inputs}
          keyboardType='name-phone-pad'
          onChangeText={ telefono => setCliente({
            ...cliente,
            telefono
          })}
          value={telefono}
        />
        <TextInput 
          label="Correo"
          placeholder='Ingresa tu Correo, ej. example@dominio.com'
          style={estilos.inputs}
          onChangeText={ correo => setCliente({
            ...cliente,
            correo
          })}
          value={correo}
        />
        <TextInput 
          label="Empresa"
          placeholder='Ingresa tu empresa, ej. Pemex'
          style={estilos.inputs}
          onChangeText={ empresa => setCliente({
            ...cliente,
            empresa
          })}
          value={empresa}
        />
        <Button
          icon="pencil-circle"
          mode="contained"
          onPress={ () => handleGuardarCliente() }
          style={estilos.button}
        >
          Guardar Cliente
        </Button>
      </View>
    </View>
  );

};

export default NuevoCliente;
