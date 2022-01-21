import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Formulario from './components/Formulario';

export const apiKey = '2e897b28dd40066b8b1655be132faf6f';

const App = () => {

    const [ busqueda, setBusqueda ] = useState({
        ciudad: '',
        pais: ''
    });

    const [ consulta, setConsulta ] = useState('');

    useEffect( () => {

        if(!consulta) return;

        console.log(consulta);

        const busqueda = async () => {

            try {
                const req = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Tabasco,MX&appid=2e897b28dd40066b8b1655be132faf6f');
                console.log(req);
            } catch (error) {
                console.log(error);
            }

        }

        busqueda();

    }, [ consulta ]);

    return (  
        <View style={styles.contenedor} >
            <Formulario 
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsulta={setConsulta}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor:{
        flex: 1,
        backgroundColor: 'rgb(71, 149, 212)',
        justifyContent: 'center',
    }
})
 
export default App;