import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    StatusBar
} from 'react-native'

import CupertinoButtonInfo from "../components/CupertinoButtonInfo"
import { EmailContext } from '../Providers/EmailContext'


export default class Inicial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: '',
        };

    }
    componentDidMount() {
        this.context.setFoto('')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content" />
                <Image style={styles.imgPhoto} source={require('../../assets/icon.png')} />
                <View style={styles.componentes}>
                    <CupertinoButtonInfo style={styles.cupertinoButtonInfo} title='Entrar' onPress={() => {
                        this.props.navigation.navigate(
                            "Login"
                        )
                    }}>
                    </CupertinoButtonInfo >
                    <View style={styles.espaco}>

                    </View>

                    <CupertinoButtonInfo style={styles.cupertinoButtonInfo} title='Cadastro' onPress={() => {
                        this.props.navigation.navigate(
                            "Cadastro",
                            { tirouFoto: false }
                        )
                    }}>
                    </CupertinoButtonInfo >

                </View>
            </View>

        )
    }


}
Inicial.contextType = EmailContext;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#d8f6ff"
    },
    componentes: {
        padding: 10,
        justifyContent: 'space-around',
    },
    Texto: {
        justifyContent: 'center',
        fontSize: 50
    },
    espaco: {
        padding: 10
    },
    cupertinoButtonInfo: {
        height: 61,
        width: 325,
        backgroundColor: "rgba(80,227,194,1)",
        shadowColor: "rgba(155,155,155,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        textDecorationColor: "#0073ba"


    },
    imgPhoto: {
        borderRadius: 1,
        paddingTop: 200,
        paddingBottom: 10,
        width: 300,
        height: 300,
        alignContent: "center",
        alignSelf: "center"
    },
})