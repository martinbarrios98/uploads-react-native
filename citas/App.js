import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Pressable,
    FlatList,
    Alert
} from 'react-native';

import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {

    const [ modal, setModal ] = useState(false);
    const [ modalPaciente, setModalPaciente ] = useState(false);
    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});
    const [ vistaPaciente, setVistaPaciente ] = useState({});

    const handleNuevaCita = () => {
        setModal(true);
    }

    const editarPacienteFn = id => {
        return setPaciente((pacientes.filter( paciente => paciente.id === id))[0]);
    }

    const eliminarPacienteFn = id => {
        Alert.alert(
            '¿ Deseas eliminar este paciente ?',
            'No se podra deshacer esta acción',
            [
                { text: 'Cancelar' },
                { text: 'Si, eliminar', onPress: () => {
                    return setPacientes(pacientes.filter( paciente => paciente.id !== id))
                }}
            ]
        )
    };


    return(
        <SafeAreaView style={styles.contenedor} >
            <View>
                <Text style={styles.titulo} >Administrador de Citas {''}
                    <Text style={styles.tituloBold} >Veterinaria</Text>
                </Text>

                <Pressable
                    onPress={ handleNuevaCita }
                    style={styles.boton}
                >
                    <Text style={styles.botonTexto} >Nueva Cita</Text>
                </Pressable>

                {
                    pacientes.length ?
                        <FlatList 
                            data={pacientes}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <Paciente 
                                    paciente={item} 
                                    setModal={setModal} 
                                    editarPacienteFn={editarPacienteFn}
                                    eliminarPacienteFn={eliminarPacienteFn}
                                    setVistaPaciente={setVistaPaciente}
                                    setModalPaciente={setModalPaciente}
                                />
                            )}
                            style={styles.listado}
                        />
                    :
                        <Text style={styles.noPacientes} >No hay pacientes aun</Text>
                }

                <InformacionPaciente 
                    modal={modalPaciente}
                    paciente={vistaPaciente}
                    setModalPaciente={setModalPaciente}
                    setVistaPaciente={setVistaPaciente}
                />

                {
                    modal && (
                        <Formulario 
                            modal={modal}
                            pacientes={pacientes}
                            setModal={setModal}
                            setPacientes={setPacientes}
                            pacienteEditar={paciente}
                            setPacienteEditar={setPaciente}
                        />)
                }
                
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#f3f4f6',
        flex: 1
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
        color: '#374151'
    },
    tituloBold: {
        fontWeight: '900',
        color: '#6d28d9'
    },
    boton:{
        backgroundColor: '#6d28d9',
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: 20,
        padding: 15
    },
    botonTexto: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    noPacientes:{
        marginTop: 40,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    listado:{
        marginVertical: 30,
        marginHorizontal: 20
    }
});

export default App;