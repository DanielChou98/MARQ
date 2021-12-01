import React, { Component, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from "react-native";
import CupertinoButtonInfo from "../components/CupertinoButtonInfo"
import EntrarInfo from '../components/EntrarInfo'
import Vertical from "../styles/Vertical";

export default props => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Vertical}>
                <View style={styles.container}>

                    <EntrarInfo
                        info='Digite seu e-mail para alterar a senha *'
                        place='Insira seu e-mail para recuperar a senha'></EntrarInfo>
                </View>
                <View style={styles.margem}>
                    <CupertinoButtonInfo
                        style={styles.cupertinoButtonInfo}
                        title='Enviar'
                        onPress={() => props.navigation.navigate(
                            "Inicial"
                        )}
                    ></CupertinoButtonInfo>
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
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

    margem: {
        marginBottom: 15
    },

    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "stretch",
        height: Dimensions.get("window").height,
        marginTop: 350,
        marginBottom: -200,
        backgroundColor: "#d8f6ff",
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
        marginBottom: 300
    },


});