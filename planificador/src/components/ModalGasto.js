import React, { useState, useEffect } from 'react'
import { 
    SafeAreaView,
    ScrollView,
    View,
    Modal,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
} from 'react-native'
import { Picker } from '@react-native-picker/picker';

import globlaStyles ,{ colores } from '../styles';

const ModalGasto = ({ 
    modal, 
    handleCambiarModal, 
    handleValidarGasto, 
    gastoEditar, 
    setGastoEditar, 
    handleEditarGasto, 
    handleEliminarGasto
}) => {

    const [ nombre, setNombre ] = useState('');
    const [ cantidad, setCantidad ] = useState('');
    const [ categoria, setCategoria ] = useState('');

    useEffect( () => {

        if(!Object.keys(gastoEditar).length) return;

        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria);

    }, [gastoEditar]);

    const handleEjecucionAcciones = () => {

        if(gastoEditar?.nombre) return handleEditarGasto({
            nombre,
            categoria,
            cantidad,
            id: gastoEditar.id
        });

        handleValidarGasto({
            nombre,
            cantidad,
            categoria
        });

    }

    return (
        <Modal
            animationType='slide'
            visible={modal}
        >
            <SafeAreaView
                style={styles.contenedor}
            >
                <ScrollView>
                    <View>
                        <Pressable style={globlaStyles.botonCancelar} onLongPress={
                                () => {handleCambiarModal(); setGastoEditar({})}
                            } >
                            <Text style={globlaStyles.botonTexto} >Cancelar</Text>
                        </Pressable>

                        {
                            gastoEditar?.nombre && <Pressable style={globlaStyles.botonCancelar} onLongPress={
                                        () => handleEliminarGasto(gastoEditar.id)
                                    } >
                                    <Text style={globlaStyles.botonTexto} >Eliminar</Text>
                                </Pressable>
                        }
                    </View>

                    <View
                        style={styles.formulario}
                    >
                        <Text style={styles.titulo} >{gastoEditar?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>

                        <View style={styles.campo} >
                            <Text style={styles.label} >Nombre Gasto:</Text>
                            <TextInput
                                style={styles.input} 
                                placeholder='Nombre de gasto, ej. Comida'
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Cantidad Gasto:</Text>
                            <TextInput 
                                placeholder='Cantidad del gasto, ej. 200'
                                keyboardType='numeric'
                                style={styles.input}
                                value={cantidad}
                                onChangeText={setCantidad}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Categoria Gasto:</Text>
                            <Picker
                                style={[styles.input, styles.inputPicker]}
                                selectedValue={categoria}
                                onValueChange={ value => {
                                    setCategoria(value)
                                }}
                            >
                                <Picker.Item label="--Seleccione --" value=" " />
                                <Picker.Item label="Ahorro" value="ahorro" />
                                <Picker.Item label="Comida" value="comida" />
                                <Picker.Item label="Casa" value="casa" />
                                <Picker.Item label="Gastos" value="gastos" />
                                <Picker.Item label="Ocio" value="ocio" />
                                <Picker.Item label="Salud" value="salud" />
                                <Picker.Item label="Suscripciones" value="suscripciones" />
                            </Picker>
                        </View>

                        <Pressable style={globlaStyles.boton} onPress={ () => handleEjecucionAcciones() }>
                            <Text style={globlaStyles.botonTexto} >{gastoEditar?.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}</Text>
                        </Pressable>

                    </View>
                </ScrollView>
            </SafeAreaView>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: colores.azulFuerte,
        flex: 1
    },
    formulario: {
        ...globlaStyles.contenedor,
        marginBottom: 100
    },
    titulo:{
        textAlign: 'center',
        fontSize: 28,
        marginVertical: 20
    },
    campo:{
        marginVertical: 10,
    },
    label:{
        color: colores.azul,
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    inputPicker:{
        borderWidth: 1,
        borderColor: 'black'
    }
})

export default ModalGasto
