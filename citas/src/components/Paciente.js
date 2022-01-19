import React from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Pressable
} from 'react-native';

export const formatearFecha = fecha => new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

const Paciente = ({
    paciente, 
    setModal, 
    editarPacienteFn, 
    eliminarPacienteFn,
    setVistaPaciente,
    setModalPaciente }) => {

    const { fecha, id, mascota } = paciente;

    const handleModalPaciente = () => {
        setVistaPaciente(paciente);
        setModalPaciente(true);
    }

    return (
        <Pressable
            onLongPress={() => handleModalPaciente()}
        >
            <View
                style={styles.contenedorPaciente}
            >
                <Text style={styles.label} >Mascota:</Text>
                <Text style={styles.texto} >{mascota}</Text>
                <Text style={styles.fecha} >{formatearFecha(fecha)}</Text>
                <View
                    style={styles.acciones}
                >
                    <Pressable
                        style={[styles.boton, styles.botonEditar]}
                        onLongPress={() => {setModal(true); editarPacienteFn(id)}}
                    >
                        <Text style={styles.botonTexto} >Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.boton, styles.botonEliminar]}
                        onLongPress={() => eliminarPacienteFn(id)}
                    >
                        <Text style={styles.botonTexto} >Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedorPaciente: {
        marginVertical: 20,
        backgroundColor: '#ffffff',
        padding: 10,
        borderBottomColor: '#94a3b8',
        borderBottomWidth: 1
    },
    label:{
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10
    },
    texto:{
        color: '#6d28d9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    fecha:{
        color: '#374151'
    },
    acciones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    boton:{
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10
    },
    botonEditar:{
        backgroundColor: '#F59E0B'
    },
    botonEliminar:{
        backgroundColor: 'red'
    },
    botonTexto:{
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#fff'
    }
})

export default Paciente
