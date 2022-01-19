import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import globalStyles, { colores } from '../styles';

const Filtro = ({filtro, setFiltro, gastos, setGastosFiltrados}) => {

    useEffect( () => {

        if(filtro === '') return setGastosFiltrados([
            ...gastos
        ]);

        setGastosFiltrados(gastos.filter( gasto => gasto.categoria === filtro));

    }, [filtro]);

    return (
        <View style={styles.contenedor} >
            <Text style={styles.titulo} >Filtrar Gastos</Text>

            <Picker
                style={[styles.input, styles.inputPicker]}
                selectedValue={filtro}
                onValueChange={ value => {
                    setFiltro(value)
                }}
            >
                <Picker.Item label="--Seleccione --" value="" />
                <Picker.Item label="Ahorro" value="ahorro" />
                <Picker.Item label="Comida" value="comida" />
                <Picker.Item label="Casa" value="casa" />
                <Picker.Item label="Gastos" value="gastos" />
                <Picker.Item label="Ocio" value="ocio" />
                <Picker.Item label="Salud" value="salud" />
                <Picker.Item label="Suscripciones" value="suscripciones" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.background,
        marginTop: 80
    },
    titulo:{
        fontSize: 22,
        fontWeight: '900',
        color: colores.gris
    }
})

export default Filtro
