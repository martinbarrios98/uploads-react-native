import React from 'react';
import {
    Image,
    Pressable,
    StyleSheet
} from 'react-native';

const src = require('./nuevo-gasto.png');

const BotonGasto = ({ handleCambiarModal }) => (
    <Pressable
        style={styles.contenedorBoton}
        onPress={() => handleCambiarModal()}
    >
        <Image 
            style={styles.imagen}
            source={src}
        />
    </Pressable>
);

const styles = StyleSheet.create({
    imagen:{
        width: 60,
        height: 60,
    },
    contenedorBoton:{
        position: 'absolute',
        bottom: 40,
        right: 20
    }
});
 
export default BotonGasto;