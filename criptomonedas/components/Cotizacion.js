import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import GlobalStyles, { colores } from '../styles/GlobalStyles';

const Cotizacion = ({ cotizacion }) => {
    return (  
        <View style={styles.contenedor} >

            <Text style={[styles.texto, styles.precio]} >
                <Text style={styles.span} >{cotizacion.PRICE}</Text>
            </Text>

            <Text style={styles.texto} >
                Precio mas alto del dia {' '}
                <Text style={styles.span} >{cotizacion.HIGHDAY}</Text>
            </Text>

            <Text style={styles.texto} >
                Precio mas bajo del dia {' '}
                <Text style={styles.span} >{cotizacion.LOWDAY}</Text>
            </Text>

            <Text style={styles.texto} >
                Variacion las ultimas 24 horas {' '}
                <Text style={styles.span} >{cotizacion.CHANGEPCT24HOUR} %</Text>
            </Text>

            <Text style={styles.texto} >
                Ultima Actualizacion {' '}
                <Text style={styles.span} >{cotizacion.LASTUPDATE}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: colores.morado,
        padding: 20,
        marginTop: 20
    },
    texto: {
        ...GlobalStyles.encabezado,
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '500',
        color: colores.blanco,
        textAlign: 'left',
        textTransform: 'capitalize'
    },
    span:{
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    precio:{
        fontSize: 24
    }
})
 
export default Cotizacion;