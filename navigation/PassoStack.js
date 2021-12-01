import React from 'react'
import { View, Text, Button } from 'react-native'
import Botao from '../src/components/Botao'

export default props => (
    <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        </View>
        <View style={{flex: 1}}>
            {props.children}
        </View>
    </View>
)