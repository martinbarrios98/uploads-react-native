import React from 'react'
import { 
    Modal,
    SafeAreaView,
    View,
    Text,
    StyleSheet, 
    Pressable} from 'react-native';

import { formatearFecha } from './Paciente';

const InformacionPaciente = ({modal, paciente, setModalPaciente, setVistaPaciente}) => {

    const { mascota, propietario, fecha, sintomas, correo, telefono } = paciente;

    return (
        <Modal
            animationType='slide'
            visible={modal}
        >
            <SafeAreaView
                style={styles.contenedor}
            >
                <View>
                    <Text style={styles.titulo} >Informacion {''}
                        <Text style={styles.tituloBold} >Paciente</Text>
                    </Text>
                    <Pressable
                        onPress={ () => {
                            setModalPaciente(false); 
                            setVistaPaciente({});
                        }}
                        style={styles.btnCerrar}
                    >
                        <Text style={styles.btnCerrarTexto} >X Cerrar</Text>
                    </Pressable>
                    <View
                        style={styles.contenido}
                    >
                        <View style={styles.campo} >
                            <Text style={styles.labelNombre} >{mascota}</Text>
                        </View>
                        <View style={styles.campo} >
                            <Text style={styles.label} >Propietario:</Text>
                            <Text style={styles.valor} >{propietario}</Text>
                        </View>
                        <View style={styles.campo} >
                            <Text style={styles.label} >Correo Electronico:</Text>
                            <Text style={styles.valor} >{correo}</Text>
                        </View>
                        <View style={styles.campo} >
                            <Text style={styles.label} >Telefono:</Text>
                            <Text style={styles.valor} >{telefono}</Text>
                        </View>
                        <View style={styles.campo} >
                            <Text style={styles.label} >Fecha:</Text>
                            <Text style={styles.valor} >{formatearFecha(fecha)}</Text>
                        </View>
                        <View style={styles.campo} >
                            <Text style={styles.label} >Sintomas:</Text>
                            <Text style={styles.valor} >{sintomas}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#F59E0B',
        flex: 1
    },
    titulo:{
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#ffffff'
    },
    tituloBold:{
        fontWeight: '900',
    },
    btnCerrar:{
        marginVertical: 20,
        backgroundColor: '#E06900',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10
    },
    btnCerrarTexto:{
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    contenido:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: '#ffffff',
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 20,
        borderRadius: 10
    },
    campo:{
        marginVertical: 10
    },
    label:{
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5,
        color: '#374151'
    },
    labelNombre:{
        color: '#6d28d9',
        fontSize: 24,
        fontWeight: '700'
    },  
    valor:{
        fontSize: 20,
        fontWeight: '700'
    }
})

export default InformacionPaciente
