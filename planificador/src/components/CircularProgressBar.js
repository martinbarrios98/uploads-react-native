import React from 'react'

import CircularProgress from 'react-native-circular-progress-indicator';

const CircularProgressBar = ({ porcentaje }) => {

    return (
        <CircularProgress 
            value={porcentaje}
            radius={150}
            valueSuffix={'%'}
            title='Gastado'
            inActiveStrokeColor='#f5f5f5'
            inActiveStrokeWidth={20}
            activeStrokeWidth={20}
            titleFontSize={20}
        />
    )
}

export default CircularProgressBar
