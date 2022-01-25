import React from 'react';
import { Button } from 'react-native-paper';

const BarraSuperior = ({ navigation, route }) => {

    const handleEnlace = () => {
        navigation.navigate('NuevoCliente');
    }

    return (
        <Button
            onPress={ () => handleEnlace ()}
            color='#ffffff'
            icon="plus-circle"
        >
            Cliente
        </Button>
    );
};

export default BarraSuperior;
