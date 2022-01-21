
import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet,
    Alert,
    Animated
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import { apiKey } from '../App';

export const animacionEntradaFn = AnimatedObjeto => {
    Animated.spring(AnimatedObjeto, {
        toValue: .9,
        useNativeDriver: true
    }).start();
}

export const animacionSalifaFn = AnimatedObjeto => {
    setTimeout(() => {
        Animated.spring(AnimatedObjeto, {
            toValue: 1,
            useNativeDriver: true,
            friction: 3
        }).start();
    }, 200);
}

const Formulario = ({
    busqueda,
    setBusqueda,
    setConsulta
}) => {

    const { ciudad, pais } = busqueda;

    const [ animacionboton ] = useState(new Animated.Value(1));

    const handleSubmit = async () => {

        animacionEntradaFn(animacionboton);

        animacionSalifaFn(animacionboton);

        if([ciudad, pais].includes('')) return Alert.alert(
            'Error',
            'No se permite campos vacios',
            'Ok'
        );

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

        setConsulta(url);

    }

    return (  
        <View style={styles.formulario} >
            <View style={StyleSheet.campo} >
                <TextInput 
                    placeholder='Ciudad'
                    placeholderTextColor='#e1e1e1'
                    onChangeText={ ciudad => setBusqueda({
                        ...busqueda,
                        ciudad
                    })}
                    style={styles.input}
                    value={ciudad}
                />
            </View>
            <View style={styles.campo} >
                <Picker
                    selectedValue={pais}
                    onValueChange={ pais => setBusqueda({
                        ...busqueda,
                        pais
                    })}
                    itemStyle={{
                        height: 120
                    }}
                    style={styles.input}
                >
                    <Picker.Item 
                        label='-- Seleccione un pais --'
                        value=''
                    />
                    <Picker.Item 
                        label='Mexico'
                        value='MX'
                    />
                    <Picker.Item 
                        label='Estados Unidos'
                        value='US'
                    />
                    <Picker.Item 
                        label='Argentina'
                        value='AR'
                    />
                    <Picker.Item 
                        label='Colombia'
                        value='CO'
                    />
                    <Picker.Item 
                        label='Costa Rica'
                        value='CR'
                    />
                    <Picker.Item 
                        label='España'
                        value='ES'
                    />
                </Picker>
            </View>

            <Pressable onPress={ () => handleSubmit() } >
                <Animated.View style={[styles.boton, { transform: [
                    {
                        scale: animacionboton
                    }
                ] }]} >
                    <Text style={styles.botonTexto} >Buscar Clima</Text>
                </Animated.View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    formulario:{
        marginHorizontal: 20
    },
    campo:{
        marginVertical: 10
    },
    input:{
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 20,
        textAlign: 'center'
    },
    boton:{
        marginTop: 20,
        backgroundColor: '#000',
        padding: 10,
        textAlign: 'center'
    },
    botonTexto:{
        color: '#ffffff',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
 
export default Formulario;