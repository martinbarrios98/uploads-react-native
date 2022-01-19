import React from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    View,
    Image
} from 'react-native';

import GlobalStyles, { colores } from '../styles/GlobalStyles';

const Header = () => {
    return (  
        <View style={styles.contenedor}>
            <SafeAreaView>
                <Text style={styles.encabezado} >CriptoMonedas</Text>
                <View style={styles.contenedorImagen} >
                    <Image 
                        style={styles.imagen}
                        source={require('../assets/img/cryptomonedas.png')}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

//paddingTop: Platform.OS === 'ios' ? 50 : 10

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: colores.morado,
        paddingVertical: 20
    },
    encabezado:{
        ...GlobalStyles.encabezado,
        color: colores.blanco,
        marginBottom: 20
    },
    contenedorImagen:{
        flexDirection: 'row'
    },
    imagen:{
        flex: 1,
        height: 150,
        marginHorizontal: 'auto'
    }
});
 
export default Header;