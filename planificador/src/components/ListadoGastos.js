import React from 'react'
import { 
    View,
    StyleSheet,
    Text,
    FlatList
 } from 'react-native';

 import { colores } from '../styles';
import Gasto from './gasto/Gasto';

const ListadoGastos = ({gastos, handleCambiarModal, setGastoEditar}) => {
    return (
        <View
            style={styles.contenedor}
        >
            <Text style={styles.titulo} >Gastos</Text>

            {
                gastos.length > 0 ?
                    gastos.map( (gasto, index) => (
                        <Gasto key={index} gasto={gasto} handleCambiarModal={handleCambiarModal} setGastoEditar={setGastoEditar} />
                    ))
                :
                    <Text style={styles.noGastos} >No hay gastos aun</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        marginVertical: 70,
    },
    titulo:{
        color: colores.gris,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 30
    },
    noGastos:{
        textAlign: 'center',
        marginVertical: 20
    }
});

export default ListadoGastos
