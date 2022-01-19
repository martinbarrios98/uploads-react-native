import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import BotonGasto from './src/components/boton-gasto/BotonGasto';
import ModalGasto from './src/components/ModalGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

const App = () => {

    const [ validoPresupuesto, setValidoPresupuesto ] = useState(false);
    const [ presupuesto, setPresupuesto ] = useState(0);
    const [ gastos, setGastos ] = useState([]);
    const [ modalGasto, setModalGasto ] = useState(false);
    const [ gastoEditar, setGastoEditar ] = useState({});
    const [ filtro, setFiltro ] = useState('');
    const [ gastosFiltrados, setGastosFiltrados ] = useState([]);

    const handleNuevoPresupuesto = presupuesto => {
        
        if(Number(presupuesto) > 0){
            setValidoPresupuesto(true);
            setPresupuesto(Number(presupuesto));
        } else return Alert.alert(
            'Error',
            'El presupuesto no es valido',
            'Ok'
        )
        
    }

    const handleCambiarModal = () => setModalGasto(!modalGasto);

    const handleValidarGasto = gasto => {

        if(Object.values(gasto).includes('')) return Alert.alert(
            'Error',
            'El gasto no es valido',
            'Ok'
        )

        const gastoNuevo = {
            id: Date.now(),
            ...gasto
        }

        setGastos([
            ...gastos,
            gastoNuevo
        ]);

        setFiltro('');

        handleCambiarModal();
        
    }

    const handleEditarGasto = gasto => {
        if(Object.values(gasto).includes('')) return Alert.alert(
            'Error',
            'El gasto no es valido',
            'Ok'
        )
        setGastos(gastos.map(gast => gasto.id === gast.id ? gasto : gast));

        handleCambiarModal();

        setGastoEditar({});
    }

    const handleEliminarGasto = id => {

        Alert.alert(
            'Estas seguro ?',
            'No se podra deshacer esta acción',
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'Si, eliminar', onPress: () => {
                    setGastos(gastos.filter( gasto => gasto.id !== id));
                    setGastoEditar({});
                    handleCambiarModal();
                }}
            ]
        );

    }

    const reiniciarApp = () => {
        Alert.alert(
            '¿ Desear reiniciar app ?',
            'Esto eliminara todos los datos',
            [
                {text: 'Cancelar'},
                {text: 'Si, resetear', onPress: async () => {
                    try {
                        await AsyncStorage.clear();
                        setValidoPresupuesto(false);
                        setPresupuesto(0);
                        setGastos([]);
                        setGastosFiltrados([]);
                        setFiltro('');
                    } catch (error) {
                        console.log(error);
                    }
                }}
            ]
        )
    }

    
    useEffect( () => {
        const obtenerPresupuestoStorage = async () => {
            try {
                const presupuestoSto = await AsyncStorage.getItem('planificador_presupuesto') ?? 0;
                if(presupuestoSto > 0){
                    setPresupuesto(JSON.parse(presupuestoSto));
                    setValidoPresupuesto(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPresupuestoStorage();
    }, [])

    useEffect( () => {
        const obtenerGastosSto = async () => {
            try {
                const gastosSto = await AsyncStorage.getItem('planificador_gastos');
                setGastos( gastosSto ? JSON.parse(gastosSto) : []);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerGastosSto();
    }, [])

    useEffect( () => {
        const almacenarPresupuestoStorage = async () => {
            try {
                await AsyncStorage.setItem('planificador_presupuesto', JSON.stringify(presupuesto));
            } catch (error) {
                console.log(error);
            }
        }

        if(!validoPresupuesto) return;

        almacenarPresupuestoStorage();
    }, [validoPresupuesto]);

    useEffect(() => {
        const guardarGastosStorage = async () => {
            try {
                await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
            } catch (error) {
                console.log(error);
            }
        }

        guardarGastosStorage();
    }, [gastos]);

    return (  
        <View style={styles.contenedor} >
            <ScrollView>

                <View style={styles.header} >
                    <Header />
                    {
                        validoPresupuesto ? 
                            <ControlPresupuesto 
                                presupuesto={presupuesto}
                                gastos={gastos}
                                reiniciarApp={reiniciarApp}
                            />
                        :
                            <NuevoPresupuesto 
                                handleNuevoPresupuesto={handleNuevoPresupuesto}
                            />
                    } 
                </View>

                { gastos.length > 0 && <Filtro  
                    filtro={filtro} 
                    setFiltro={setFiltro} 
                    gastos={gastos}
                    setGastosFiltrados={setGastosFiltrados}
                /> }

                { gastos.length > 0 && <ListadoGastos 
                    gastos={gastosFiltrados} 
                    handleCambiarModal={handleCambiarModal} 
                    setGastoEditar={setGastoEditar}
                    />
                }

            </ScrollView>

            { validoPresupuesto && <BotonGasto handleCambiarModal={handleCambiarModal} />}

            { modalGasto && <ModalGasto 
                modal={modalGasto} 
                handleCambiarModal={handleCambiarModal} 
                handleValidarGasto={handleValidarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                handleEditarGasto={handleEditarGasto}
                handleEliminarGasto={handleEliminarGasto}
                /> 
            }
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#f5f5f5',
        flex: 1,
        zIndex: 20
    },
    header:{
        backgroundColor: '#3b82f6'
    }
})
 
export default App;