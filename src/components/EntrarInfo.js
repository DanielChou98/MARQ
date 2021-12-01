import React, { } from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView } from "react-native";

function EntrarInfo(props) {
    return (
        <View style={styles.margem}>
            
                {//<Text style={styles.loremIpsum}>{props.info}</Text>
                }
                <TextInput
                    editable={true}
                    style={styles.textinput}
                    placeholder={props.place}
                    Value={props.Value}
                    dataDetector="none"
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.senhatexto}
                    onBlur={props.onBlur}
                ></TextInput>
            
        </View>
    );
}

const styles = StyleSheet.create({
    vertical: {
        //flex:1,
        //display: "flex",
        //flexDirection: "column",
        //justifyContent: "space-between",
        //alignItems: "center",
        //borderWidth: 2,
        //width: '17.3vw'
    },
    margem: {
        marginBottom: 15
    },
    // horizontal: {
    //     //display: "flex",
    //     //flexDirection: "row",
    //     //justifyContent: "space-between",
    //     //alignItems: "center",
        
    // },
    // loremIpsum: {
    //     //fontFamily: "roboto-regular",
    //     color: "#121212",
    //     fontSize: 20,
    //     textAlign: "center",
    //     marginBottom:20
    // },
    textinput: {
        color: "#000",
        backgroundColor:"#fff",
        padding:20,
        //paddingRight:200,
        fontSize: 20,
        width:350,
        //alignSelf: "stretch",
        //flex: 1,
        //lineHeight: 16,
        //paddingTop: 8,
        //paddingBottom: 8,
        //margin:10,
        //borderBottomWidth:1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius:90,
        shadowColor: "rgba(0,0,0,1)",
        // shadowOffset: {
        //   width: 3,
        //   height: 3
        // },
        // elevation: 5,
        // shadowOpacity: 1,
        // shadowRadius: 0
    },
});

export default EntrarInfo;
