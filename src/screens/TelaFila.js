import React, { Component, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Dimensions, Button } from "react-native";
import FilaInfo from "../components/FilaInfo";
import { EmailContext } from '../Providers/EmailContext'
import hospitais from "../database/Hospitais";


export default class TelaFila extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filaBD: '',
            HospitalID: this.context,
            fila_: [null, null, null, null, null, null],
            fila: [null, null, null, null, null, null],
            length: '',
            cpf: '',
            elmState: '',
            interval:[],
        };
        this.atualizaFila = this.atualizaFila.bind(this)
        this.useEffect = this.useEffect.bind(this)
    }
    componentDidMount() {
        let array = []
        new hospitais().getFilaByHospitalID(this.context.Hospitais, this.context.Cpf).then((x) => {
            x.forEach(el => {
                array.push(el.virtual)
            });
            console.log(Object.values(array))
            console.log(this.context.Cpf)
            this.setState({ fila: array })
        })
        this.useEffect()
        this.atualizaFila()
    }

    async useEffect() {
        console.log('entrou useEffect')
        await new usuarios().getByEmail(this.context.Email).then((x) => {
            console.log(x.data().cpf)
            this.setState({ cpf: x.data().cpf })
            this.setState({ elmState: x })
        });
    };

    atualizaFila() {
         this.setState({interval:setInterval(() => {
            let array = []
            new hospitais().getFilaByHospitalID(this.context.Hospitais, this.context.Cpf).then((x) => {
                x.forEach(el => {
                    array.push(el.virtual)
                });
                console.log(Object.values(array))
                this.setState({ fila: array })
            })
        }, 20000)
    }) 
    }




    render() {
        if (this.state.fila.length == 0) {
            clearInterval(this.state.interval)
            clearTimeout(timeout)
            this.props.navigation.navigate('Triagem');
        }
        else {
            var timeout = setTimeout(() => {
                let x = [...this.state.fila.map(
                    (elem, key) => {
                        if (key == 0) {
                            return <View key={key} style={styles.containerPessoa}><FilaInfo cor="black" /><Text>{this.state.fila.length - key - 1}</Text></View>
                        }
                        if (elem) {
                            return <View key={key} style={styles.containerPessoa}><FilaInfo cor="blue" /><Text>{this.state.fila.length - key - 1}</Text></View>
                        } else {
                            return <View key={key} style={styles.containerPessoa}><FilaInfo cor="red" /><Text>{this.state.fila.length - key - 1}</Text></View>
                        }
                    }
                )];

                this.setState({ fila_: x });
            }, 1000)
        }
        let marq = 0

        let usuarios = this.state.fila_


        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.horizontal}>
                        {usuarios}
                    </View>
                    <View style={styles.margem}>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

TelaFila.contextType = EmailContext;

const styles = StyleSheet.create({

    horizontal: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",

    },

    loremIpsum: {
        color: "#121212",
        fontSize: 21,
    },

    margem: {
        marginBottom: 15
    },

    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch",
        height: Dimensions.get("window").height,
        backgroundColor: "#d8f6ff",
    },
    containerPessoa: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch",
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