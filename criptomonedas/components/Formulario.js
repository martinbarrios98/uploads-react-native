import React, { useEffect, useState } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    Pressable,
    Alert
 } from 'react-native';
 import axios from 'axios';
 import { Picker } from '@react-native-picker/picker';

import GlobalStyles, { colores } from '../styles/GlobalStyles';

const Formulario = ({cotizacionFn}) => {

    const [ moneda, setMoneda ] = useState('');
    const [ cripto, setCripto ] = useState('');
    const [ criptomonedas, setCriptomonedas ] = useState([]);

    const handleCotizar = () => {
        
        if([cripto, moneda].includes('')) return Alert.alert(
            'Error',
            'No se permite campos vacios',
            'Ok'
        );

        cotizacionFn({
            cripto,
            moneda
        });

    }

    useEffect(() => {

        const consultarApi = async () => {
            const req = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
            setCriptomonedas(req.data.Data.map( mnd => {
                return {
                    nombre: mnd.CoinInfo.Name,
                    fullNombre: mnd.CoinInfo.FullName,
                    id: mnd.CoinInfo.Id
                }
            }));
        }
        consultarApi();

    }, []);

    return (  
        <View style={style.contenedor} >
            <View style={style.campo} >
                <Text style={style.label} >Moneda</Text>
                <Picker
                    selectedValue={moneda}
                    onValueChange={ value => setMoneda(value)}
                    style={style.input}
                    itemStyle={{
                        height: 120
                    }}
                >
                    <Picker.Item label='-- Seleccione --' value='' />
                    <Picker.Item label='Dolares' value='USD' />
                    <Picker.Item label='Peso Mexicano' value='MXN' />
                    <Picker.Item label='Euro' value='EUR' />
                    <Picker.Item label='Libra Esterlina' value='GBP' />
                </Picker>
            </View>
            <View style={style.campo} >
                <Text style={style.label} >Criptomoneda</Text>
                <Picker
                    selectedValue={cripto}
                    onValueChange={ value => setCripto(value)}
                    itemStyle={{
                        height: 120
                    }}
                    style={style.input}
                >
                    <Picker.Item label='-- Seleccione --' value='' />
                    { criptomonedas?.map( moneda => (<Picker.Item 
                        key={moneda.id}
                        label={moneda.fullNombre}
                        value={moneda.nombre}
                    />)) }
                </Picker>
            </View>

            <Pressable
                style={style.boton}
                onPress={() => handleCotizar() }
            >
                <Text style={style.botonTexto} >Cotizar</Text>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    contenedor:{
        marginTop: 35
    }, 
    label: {
        ...GlobalStyles.encabezado,
        textAlign: 'left',
        fontSize: 20,
        marginBottom: 10
    },
    input:{
        backgroundColor: colores.gris,
        borderRadius: 10
    }, 
    campo:{
        marginVertical: 15,
        marginHorizontal: 20
    },
    boton:{
        backgroundColor: colores.morado,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 10
    },
    botonTexto:{
        ...GlobalStyles.encabezado,
        color: colores.blanco,
        fontSize: 20
    }
});
 
export default Formulario;