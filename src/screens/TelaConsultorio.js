import React, { useState, Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Dimensions
} from 'react-native'
import { EmailContext } from '../Providers/EmailContext';
import usuarios from '../database/Usuarios';


export default class TelaConsultorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrValue: '',
            elmState: '',
            consultorio1:'',
            consultorio2:'',
            elmState:'',
        };
        this.useEffect=this.useEffect.bind(this)
    }

    componentDidMount(){
        this.useEffect()
    }

    async useEffect() {
        console.log('entrou useEffect')
        await new usuarios().getByEmail(this.context.Email).then((x) => {
            console.log(x.data().cpf)
            this.setState({ consultorio1: x.data().consultorio })
            this.setState({ elmState: x })
        });
    };


    render() {
        return (
            <SafeAreaView>
                <View style={[styles.container]}>
                <View style={styles.margem}>
                    <Text style={styles.loremIpsum}>Por favor, dirija-se ao consultorio {this.state.consultorio1}</Text>
                </View>
                </View>
            </SafeAreaView>
        )
    }

}
TelaConsultorio.contextType = EmailContext;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "stretch",
        backgroundColor: "#d8f6ff",
        height: Dimensions.get("window").height,
    },

    containerQr: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5
    },

    margem: {
        marginBottom: 15
    },

    loremIpsum: {
        color: "#121212",
        fontSize: 21,
        textAlign: "center"
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
    },
})