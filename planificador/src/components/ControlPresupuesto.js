import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    Pressable
} from 'react-native';

import globalStyles, { colores } from '../styles';

import { formatearCantidad } from '../helpers';

import CircularProgressBar from './CircularProgressBar';

const ControlPresupuesto = ({ presupuesto, gastos, reiniciarApp }) => {

    const [ disponible, setDisponible ] = useState(0);
    const [ gastado, setGastado ] = useState(0);
    const [ porcentaje, setPorcentaje ] = useState(0);

    useEffect( () => {

        const totalGastos = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0);
        const totalDisponible = presupuesto - totalGastos;

        const nuevoPorcentaje = ( (presupuesto - totalDisponible) / presupuesto ) * 100;


        setPorcentaje(nuevoPorcentaje)
        setDisponible(totalDisponible);
        setGastado(totalGastos);

    }, [gastos]);

    return (
        <View
            style={styles.contenedor}
        >
            <View
                style={styles.centrarGrafica}
            >
                <CircularProgressBar porcentaje={porcentaje} />
            </View>
            <View style={styles.contenedorTexto} >
                <Pressable style={[globalStyles.boton, styles.marginado]} onPress={ () => reiniciarApp() } >
                    <Text style={globalStyles.botonTexto} >Reiniciar App</Text>
                </Pressable>
                <Text style={styles.valor} >
                    <Text style={styles.label} >Presupuesto: {''}</Text>
                    {formatearCantidad(presupuesto)}
                </Text>

                <Text style={styles.valor} >
                    <Text style={styles.label} >Disponible: {''}</Text>
                    {formatearCantidad(disponible)}
                </Text>

                <Text style={styles.valor} >
                    <Text style={styles.label} >Gastado: {''}</Text>
                    {formatearCantidad(gastado)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: globalStyles.contenedor,
    centrarGrafica:{
        alignItems: 'center'
    },
    contenedorTexto:{
        marginTop: 40,
    },
    label:{
        color: colores.azul,
        fontWeight: '700'
    },
    valor:{
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    marginado:{
        marginBottom: 20
    }
});

export default ControlPresupuesto
