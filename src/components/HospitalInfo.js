import React, { } from "react";
import { StyleSheet, View, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import CupertinoButtonInfo from "./CupertinoButtonInfo";

function mostraConsole() {
  console.log()
}

function HospitalInfo(props) {
  return (
    <View style={{}}>
      <View style={{}}>
        <CupertinoButtonInfo
          style={styles.cupertinoButtonInfo}
          title={props.nome}
          onPress={props.onPress}
        ></CupertinoButtonInfo>
        <View style={styles.horizontal}>
          <View style={styles.horizontal}>
            <EntypoIcon name="star" style={styles.icon}></EntypoIcon>
            <Text style={styles.loremIpsum}>{props.estrelas}</Text>
          </View>

          <View style={styles.horizontal}>
            <EntypoIcon name="location-pin" style={styles.icon}></EntypoIcon>
            <Text style={styles.loremIpsum}>{props.distancia}</Text>
          </View>

          <View style={styles.horizontal}>
            <IoniconsIcon name="md-time" style={styles.icon}></IoniconsIcon>
            <Text style={styles.loremIpsum}>{props.tempo}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  vertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    //borderWidth: 2,
    //width: '17.3vw'
  },
  margem:{
    //marginBottom: 15
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  loremIpsum: {
    //fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
  },

  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
 
});

export default HospitalInfo;