import React, { useCallback, useEffect, useState } from 'react'
import { 
    Modal, 
    Text, 
    SafeAreaView, 
    View, 
    StyleSheet, 
    TextInput, 
    ScrollView, 
    Pressable,
    Alert
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({ 
    modal, 
    pacientes,
    setModal, 
    setPacientes, 
    pacienteEditar, 
    setPacienteEditar }) => {

    const [ mascota, setMascota ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ correo, setCorreo ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ fecha, setFecha ] = useState(new Date())
    const [ sintomas, setSintomas ] = useState('');

    useEffect(() => {

        if(!Object.values(pacienteEditar).length) return;

        setMascota(pacienteEditar.mascota);
        setPropietario(pacienteEditar.propietario);
        setCorreo(pacienteEditar.correo);
        setTelefono(pacienteEditar.telefono);
        setFecha(pacienteEditar.fecha);
        setSintomas(pacienteEditar.sintomas);

    }, [pacienteEditar]);

    const handleCita = () => {
        
        //VALIDAR

        if([mascota, propietario, correo, telefono, fecha, sintomas].includes('')) return Alert.alert(
            'Error',
            'No se permite campos vacios',
            [{text: 'Entendido'}]
        )

        // CREAR OBJETO DE CITA

        const cita = {
            id: Date.now(),
            mascota,
            propietario,
            correo,
            telefono,
            fecha,
            sintomas
        }

        //Agregamos al state de pacientes
        setPacientes([
            ...pacientes,
            cita
        ]);

        //Limpiar state de formulario

        setMascota('');
        setPropietario('');
        setCorreo('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');

        //Modal false
        setModal(!modal)

    }

    const handleCitaEditar = () => {

        if([mascota, propietario, correo, telefono, fecha, sintomas].includes('')) return Alert.alert(
            'Error',
            'No se permite campos vacios',
            [{text: 'Entendido'}]
        )
        
        //Guardamos el paciente editado 

        const pacientesNuevo = pacientes.map( paciente => paciente.id === pacienteEditar.id ? { 
            id: pacienteEditar.id,
            mascota,
            propietario,
            correo,
            telefono,
            fecha,
            sintomas
         } : paciente)

         setPacientes([
             ...pacientesNuevo
         ]);

         //Reseteamos lo demas

         setPacienteEditar({});

        //Limpiar state de formulario

        setMascota('');
        setPropietario('');
        setCorreo('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');

        //Modal false
        setModal(!modal)

    }

    const handleCerrarModal = () => {
        setModal(false);
        setMascota('');
        setPropietario('');
        setCorreo('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');
        setPacienteEditar({});
    }

    return (
        <Modal
            animationType='slide'
            visible={modal}
        >
            <SafeAreaView
                style={styles.contenido}
            >
                <ScrollView>

                    <View>
                        <Text
                            style={styles.titulo}
                        >{mascota ? mascota : 'Nueva' } {''}
                            <Text style={styles.tituloBold} >Cita</Text>
                        </Text>

                        <Pressable
                            style={styles.btnCancelar}
                            onPress={() => handleCerrarModal()}
                        >
                            <Text 
                                style={styles.btnCancelarTexto}
                            > X Cancelar </Text>
                        </Pressable>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Nombre Mascota</Text>
                            <TextInput 
                                placeholder='Nombre Mascota'
                                placeholderTextColor={'#666'}
                                style={styles.input}
                                onChangeText={setMascota}
                                name='mascota'
                                value={mascota}
                            />
                        </View>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Nombre Propietario</Text>
                            <TextInput 
                                placeholder='Nombre Propietario'
                                placeholderTextColor={'#666'}
                                style={styles.input}
                                onChangeText={setPropietario}
                                name='propietario'
                                value={propietario}
                            />
                        </View>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Correo Propietario</Text>
                            <TextInput 
                                placeholder='Correo Propietario'
                                placeholderTextColor={'#666'}
                                keyboardType='email-address'
                                style={styles.input}
                                name='correo'
                                value={correo}
                                onChangeText={setCorreo}
                            />
                        </View>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Telefono Propietario</Text>
                            <TextInput 
                                placeholder='Telefono Propietario'
                                placeholderTextColor={'#666'}
                                keyboardType='number-pad'
                                style={styles.input}
                                onChangeText={setTelefono}
                                name='telefono'
                                value={telefono}
                                maxLength={10}
                            />
                        </View>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Fecha Alta</Text>
                            <View
                                style={styles.fechaContenedor}
                            >
                                <DatePicker 
                                    date={fecha}
                                    onDateChange={setFecha}
                                    locale='es'
                                />
                            </View>
                        </View>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Sintomas Mascota</Text>
                            <TextInput 
                                placeholder='Sintomas Mascota'
                                placeholderTextColor={'#666'}
                                style={[styles.input, styles.sintomasInput]}
                                onChangeText={setSintomas}
                                name='sintomas'
                                value={sintomas}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>

                        <Pressable
                            style={styles.btnNuevaCita}
                            onPress={Object.values(pacienteEditar).length ? handleCitaEditar : handleCita}
                        >
                            <Text 
                                style={styles.btnNuevaCitaTexto}
                            >{Object.values(pacienteEditar).length ? 'Editar Paciente' : 'Agregar Paciente'}</Text>
                        </Pressable>

                    </View>

                </ScrollView>
                
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    contenido:{
        backgroundColor: '#6d28d9',
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
    btnCancelar:{
        marginVertical: 20,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10
    },
    btnCancelarTexto:{
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campo:{
        marginTop: 20,
        marginHorizontal: 30
    },
    label:{
        color: '#ffffff',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input:{
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
    },
    sintomasInput:{
        height: 100
    },
    fechaContenedor: {
        backgroundColor: '#ffffff',
        borderRadius: 10
    },
    btnNuevaCita:{
        marginVertical: 30,
        marginHorizontal: 30,
        backgroundColor: '#f59e0b',
        paddingVertical: 15,
        borderRadius: 10
    },
    btnNuevaCitaTexto:{
        textAlign: 'center',
        color: '#5827A4',
        textTransform: 'uppercase',
        fontWeight: '700'
    }
})

export default Formulario
