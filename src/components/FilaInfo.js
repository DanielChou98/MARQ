import React, { Component, useState } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";

function FilaInfo(props) {
    return (
        <View style={styles.vertical}>
            <Image
                style={{
                    tintColor: props.cor,
                    resizeMode: "contain",
                    height: 100,
                    width: 100
                }}
                source={require("./queue.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
vertical: {
    //flex:1,
    display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
},
})

export default FilaInfo;