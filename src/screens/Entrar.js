import React, { Component, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Dimensions, Image } from "react-native";
import { CheckBox } from 'react-native-elements'
import EntrarInfo from '../components/EntrarInfo'
import CupertinoButtonInfo from "../components/CupertinoButtonInfo"
import { EmailContext } from "../Providers/EmailContext";
import usuarios, { addUsu } from '../database/Usuarios'
import { ScrollView } from "react-native-gesture-handler";
import * as Location from 'expo-location'





export default class Entrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Email: this.context,
            EmailCadastrado: false,
            checado: '',
            elmState: '',
            senha: "",
            senhaBD: '',
            senhaCadastrada: false,
            Teste: "",
            Hospitais: this.context,
            startLat: null,
            startLong: null,
        };
        this.validaEmail = this.validaEMail.bind(this)
        this.validaSenha = this.validaSenha.bind(this)
        this.validaLogin = this.validaLogin.bind(this)
        this.listaInicial = this.listaInicial.bind(this)
    }

    async componentDidMount() {
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
        });
        this.setState({
            startLat: location.coords.latitude,
            startLong: location.coords.longitude
        })

    }
    async validaEMail() {
        await new usuarios().getByEmail(this.context.Email).then((x) => {
            if (x !== null) {
                this.setState({ EmailCadastrado: true });
            }
        });
        //console.log('EmailCadastrado: ' + this.state.EmailCadastrado)
    }

    async validaSenha() {
        if (this.state.EmailCadastrado) {
            await new usuarios().getByEmail(this.context.Email).then((x) => {
                this.setState({ senhaBD: x.data().senha });
            });
        }
        if (this.state.senhaBD == this.state.senha) {
            this.setState({ senhaCadastrada: true })
        } else {
            this.setState({ senhaCadastrada: false })
        }
        //console.log('senhaBD: ' + this.state.senhaBD)
    }

    validaLogin() {
        if (this.state.EmailCadastrado == true && this.state.senhaCadastrada == true) {
            console.log('latitude: ' + this.state.startLat, 'longitude: ' + this.state.startLong)
            this.props.navigation.navigate(
                'Sintomas',
                { startLat: this.state.startLat, startLong: this.state.startLong })
            this.listaInicial()
        }
        //else { console.log("vish") }
    }

    listaInicial() {
        new usuarios().getAllHospitais(this.state.startLat, this.state.startLong).then((x) => {
            console.log('listaInicial: ' + Object.values(x))
            this.context.setHospitais(Object.values(x))
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Image style={styles.imgPhoto} source={require('../../assets/marq.png')} />
                            <View style={{ marginTop: 200 }}>
                                <EntrarInfo info='E-mail *' place='Insira seu e-mail' onChangeText={(e) => {
                                    this.setState({ email: e })
                                    this.context.setEmail(e);
                                }}
                                    onBlur={() => {
                                        this.validaEmail()
                                        { this.state.EmailCadastrado ? <Text> Email cadastrado</Text> : null }
                                    }}
                                ></EntrarInfo>
                            </View>
                            <View style={{ marginTop: -20 }}>
                                <EntrarInfo info='Senha *' place='Insira sua senha' onChangeText={(e) => this.setState({ senha: e })} senhatexto={true}
                                    onBlur={() => {
                                        this.validaSenha()
                                        { this.state.senhaCadastrada ? <Text> Senha cadastrado</Text> : null }
                                    }}
                                ></EntrarInfo>
                            </View>

                            <View style={styles.margem}>
                                <CheckBox
                                    title='Esqueceu a senha?'
                                    checked={this.state.checado}
                                    onPress={() => {
                                        this.setState({ checado: !this.state.checado })
                                        this.props.navigation.navigate(
                                            "EsqueciSenha"
                                        )
                                    }}
                                    style={styles.materialCheckboxWithLabel}
                                ></CheckBox>
                            </View>
                            <View style={styles.margem}>
                                <CupertinoButtonInfo
                                    style={styles.cupertinoButtonInfo}
                                    title='Continuar'
                                    onPress={() => {
                                        this.validaLogin()
                                    }
                                    }
                                ></CupertinoButtonInfo>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )

    }

}
Entrar.contextType = EmailContext;

let windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "stretch",
        height: Dimensions.get("window").height,
        backgroundColor: "#d8f6ff",
    },

    materialCheckboxWithLabel: {
        height: 44,
        width: 348,
    },

    loremIpsum: {
        color: "#121212",
        fontSize: 21,
    },
    margem: {
        marginBottom: 100
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
    botaoVoltar: {
        height: 30,
        width: 162,
        backgroundColor: "#ADD8E6",
        shadowColor: "rgba(155,155,155,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
    },
    imgPhoto: {
        borderRightWidth: 1,
        borderRadius: 1,
        marginTop: 200,
        marginBottom: -300,
        paddingTop: 20,
        paddingBottom: 20,
        width: 400,
        height: 200,
        alignContent: "center",
        alignSelf: "center"
    },

});
