import 'react-native-gesture-handler';
import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Inicio from './pages/Inicio';
import NuevoCliente from './pages/NuevoCliente';
import DetallesClientes from './pages/DetallesCliente';

import BarraSuperior from './src/components/ui/BarraSuperior';


export const theme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        primary: '#6200EE',
        accent: '#0655BF'
    }
}

/* 
    options={ ({ navigation, route }) => ({
                        headerLeft: (props) => <BarraSuperior 
                            {...props}
                            navigation={navigation}
                            route={route}
                        />
                    })}
*/

const App = () => {

    return (  
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Inicio'
                screenOptions={{
                    headerStyle:{
                        backgroundColor: theme.colors.primary
                    },
                    headerTintColor: theme.colors.surface, 
                    headerTitleStyle:{
                        fontWeight: 'bold'
                    }
                }}
            >
                <Stack.Screen 
                    name="Inicio"
                    component={Inicio}
                />

                <Stack.Screen 
                    name="NuevoCliente"
                    component={NuevoCliente}
                    options={{
                        title: 'Nuevo Cliente'
                    }}
                />

                <Stack.Screen 
                    name="DetallesClientes"
                    component={DetallesClientes}
                    options={{
                        title: 'Detalles Cliente'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
 
export default App;