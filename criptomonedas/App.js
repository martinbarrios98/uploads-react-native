import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';
import axios from 'axios';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

import { colores } from './styles/GlobalStyles';

const App = () => {

    const [ cotizacionValida, setCotizacionValida ] = useState({});
    const [ loading, setLoading ] = useState(false);

    const cotizacionFn = async objeto => {

        if(cotizacionValida?.PRICE) {
            setCotizacionValida({});
        }

        try {
            const res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${objeto.cripto}&tsyms=${objeto.moneda}`);

            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setCotizacionValida({
                    ...res.data.DISPLAY[objeto.cripto][objeto.moneda]
                });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.contenedor} >
            <ScrollView>
                <Header />
                <Formulario 
                    cotizacionFn={cotizacionFn}
                />

                { loading && <ActivityIndicator size="large" color={colores.morado} style={{
                    marginTop: 25
                }} /> }
                { cotizacionValida?.PRICE && <Cotizacion cotizacion={cotizacionValida} /> }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    }
});

export default App;
