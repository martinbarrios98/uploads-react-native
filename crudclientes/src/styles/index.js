import {
    StyleSheet
} from 'react-native'
import { theme } from '../../App';

export const reutilizables = StyleSheet.create({
    headline: {
        textAlign: 'center',
        marginVertical: 30,
        fontSize: 30
    },
    contenedor:{
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10
    },
    marginadoVertical:{
        marginVertical: 15
    }
});

export const estilos = StyleSheet.create({
    inputs:{
        marginBottom: 15
    },
    button:{
        marginTop: 15,
        padding: 13
    },
    fab:{
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    },
    texto:{
        marginBottom: 15,
        fontSize: 18
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});