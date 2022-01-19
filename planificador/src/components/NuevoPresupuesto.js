import React, { useState } from 'react'
import { 
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet
} from 'react-native'

const NuevoPresupuesto = ({handleNuevoPresupuesto}) => {

    const [ presupuesto, setPresupuesto] = useState(0);

    return (
        <View style={styles.contenedor} >
            <Text style={styles.label} >Definir Presupuesto</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Agrega tu presupuesto ej. 300'
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />
            <Pressable
                style={styles.boton}
                onPress={ () => handleNuevoPresupuesto( presupuesto )}
            >
                <Text style={styles.botonTexto} >Agregar Prepuesto</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        transform: [{
            translateY: 50
        }],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    label:{
        textAlign: 'center',
        fontSize: 24,
        color: '#3b82f6'
    },
    input:{
        padding: 10,
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 13
    },
    boton:{
        backgroundColor: '#1048a4',
        marginTop: 13,
        padding: 10,
        borderRadius: 10
    },
    botonTexto:{
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default NuevoPresupuesto
