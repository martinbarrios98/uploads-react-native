import React from 'react'
import {  
    View,
    Text,
    StyleSheet,
    Pressable,
    Image
} from 'react-native'

import globalStyles, { colores } from '../../styles';

import { formatearCantidad, formatearFecha } from '../../helpers';

export const diccionarioIcon = {
    ahorro: require('./icono_ahorro.png'),
    comida: require('./icono_comida.png'),
    casa: require('./icono_casa.png'),
    gastos: require('./icono_gastos.png'),
    ocio: require('./icono_ocio.png'),
    salud: require('./icono_salud.png'),
    suscripciones: require('./icono_suscripciones.png')
}

const Gasto = ({gasto, handleCambiarModal, setGastoEditar}) => {
   
    const { nombre, categoria, cantidad, id } = gasto;

    const handleAcciones = () => {
        handleCambiarModal();
        setGastoEditar(gasto);
    }

    return (
        <Pressable
            onLongPress={handleAcciones}
        >
            <View style={styles.contenedor} >
                <View style={styles.contenido} >
                    <View style={styles.contenedorImagen} >
                        <Image 
                            style={styles.imagen}
                            source={diccionarioIcon[categoria]}
                        />
                        <View style={styles.contenedorTexto} >
                            <Text style={styles.categoria} >{categoria}</Text>
                            <Text style={styles.nombre} >{nombre}</Text>
                            <Text style={styles.fecha} >{formatearFecha(id)}</Text>
                        </View>
                    </View>
                    <Text style={styles.cantidad} >{formatearCantidad(cantidad)}</Text>
                </View>        
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.background,
        marginVertical: 10
    },
    contenido:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contenedorImagen:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    contenedorTexto:{
        flex: 1
    },
    nombre:{
        fontSize: 22,
        marginBottom: 5,
        fontWeight: '700'
    },
    cantidad:{
        fontSize: 20,
        fontWeight: '700'
    },
    imagen:{
        width: 80,
        height: 80,
        marginRight: 20
    },
    categoria:{
        color: colores.gris,
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    fecha: {
        fontWeight: '700',
        color: colores.rojo
    }
});

export default Gasto
