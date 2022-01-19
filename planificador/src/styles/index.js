
export const colores = {
    blanco: '#ffffff',
    azul: '#3b82f6',
    azulFuerte: '#1048a4',
    rojo: '#DB2777',
    gris: '#64748b'
}

const globalStyles = {
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
    background:{
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    boton:{
        backgroundColor: colores.azulFuerte,
        marginTop: 13,
        padding: 10,
        borderRadius: 10
    },
    botonTexto:{
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    botonCancelar:{
        backgroundColor: colores.rojo,
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10
    }
}

export default globalStyles;