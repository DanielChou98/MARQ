import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";

function Chaticone(props) {
  const msgqtd = props.mqtd
  if(msgqtd==0){
  return (
    <View style={{marginRight:10}}>
    <TouchableOpacity style={styles.icon} onPress={props.onPress}>
        <Image style= {styles.imgPhoto} source={require('../../assets/chat-icone.png')} resizeMode="cover" />
    </TouchableOpacity>
    </View>
  );
}
  return(
    <View style={{marginRight:10}}>
    <TouchableOpacity style={styles.icon} onPress={props.onPress}>
      <View style={styles.not}><Text style={{textAlign:'center', color:"white"}}>{props.mqtd}</Text></View>
        <Image style= {styles.imgPhoto} source={require('../../assets/chat-icone.png')} resizeMode="cover" />
    </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  icon:{
    backgroundColor: "#d8f6ff",
    borderWidth:1,
    borderRadius:75,
    padding:35,
    borderColor:"grey"
  },
  imgPhoto: {
    width: 60,
    height: 60,
    marginTop:6,
    alignSelf: "center",
    position:"absolute"
    
},
not:{
  backgroundColor:"red",
  borderRadius:15,
  width:30,
  height:30,
  position:"absolute",
  marginTop:-10,
  alignItems:"center",
  justifyContent:'center',
  marginLeft:50
}

});

export default Chaticone;
