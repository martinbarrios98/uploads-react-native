import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Headline, List, Button, FAB } from 'react-native-paper';

import { estilos, reutilizables } from '../src/styles';

const Inicio = ({navigation}) => {

    const [ clientes, setClientes ] = useState([]);
    const [ consultarApi, setConsultar ] = useState(true);

    useEffect( () => {
        const obtenerClientes = async () => {
          try {
              const { data } = await axios.get(`http://localhost:3000/clientes`);
              setClientes(data);
              setConsultar(false);
          } catch (error) {
              console.log(error);
          }
        }

        if(consultarApi){
          obtenerClientes();
        }

    }, [consultarApi])


    return (
        <View
          style={reutilizables.contenedor}
        >
            <Headline style={reutilizables.headline} >{
              clientes.length ? 'Clientes Registrados' : 'No hay Clientes Registrados'
            }</Headline>
            <FlatList
                data={clientes}
                keyExtractor={ cliente => (cliente.id).toString() }
                renderItem={ ({item}) => (
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress={ () => navigation.navigate('DetallesClientes', { item, setConsultar }) }
                    />
                )}
            />

            <FAB 
              icon="plus"
              style={estilos.fab}
              onPress={ () => navigation.navigate('NuevoCliente', { setConsultar }) }
            />
        </View>
    );
};

export default Inicio;
