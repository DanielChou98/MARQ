import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import Chaticone from './../components/Chaticone'
import { EmailContext } from '../Providers/EmailContext';
import hospitais from '../database/Hospitais';



import customStyle from '../../assets/dadsa/customStyle';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Hospital: this.props.route.params.Hospital,
      qtdmsg: 0,
      msginicio: 0,
      msgnova: 0,
      distancia: '',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      duracao: 10000,
      X: 10,
      TE: this.props.route.params.tempo,
      TF: 0,
      TelaOn: true



    }
    loaded: false
  }
  componentDidMount() {
    this.getLocationAsync();
    this.getmensagemcomeco();
    this.interval = setInterval(() => { this.getmensagem(), this.getLocationAsync() }, 10000)
    var lola = 1;
    var lolo = 1
    let msg = this.state.qtdmsg
    var interval2 = setInterval(() => {
      console.log('Hospital mapa: ' + this.context.Hospitais)
      console.log('teste do if: ' + this.state.duracao - this.state.TF <= 0 && lola === 1)
      if (this.state.duracao - this.state.TF <= 0 && lola === 1) {
        console.log('entrou addfila')
        new hospitais().addUsuFila(this.context.Cpf, this.context.id, this.context.Hospitais)
        lola = 0
      }
      if (this.state.distancia < 0.5 && lolo === 1) {
        this.props.navigation.navigate('Fila')
        clearInterval(this.interval, interval2, interval3)
        lolo = 0
      }
    }, 10000)
    var interval3 = setInterval(
      () => {
        if (lola === 1) {
          console.log('lola:' + lola === 1)
          console.log('entrou addfila')
          new hospitais().addUsuFila(this.context.Cpf, this.context.id, this.context.Hospitais) // so para testar tem que tirar depois
          this.props.navigation.navigate('Fila')
          clearInterval(this.interval, this.interval2, this.interval3)
          lola = 0
        }
      }, 7000
    )

  }
  async getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();;
    if (status === 'granted') {
      const location = await Location.getLastKnownPositionAsync({
        accuracy: 10,
      });

      this.setState({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    } else {
      throw new Error('Location permission not granted');
    }
  }
  async getmensagem() {
    console.log('tempo: ' + this.state.TE)
    this.setState({ TF: this.state.TE - this.state.X })
    var urlToFetchDistance = "https://firestore.googleapis.com/v1/projects/marq2-768c9/databases/(default)/documents/usuarios/" + this.context.id + "/chats?orderBy=createdAt"
    fetch(urlToFetchDistance)
      .then(res => {
        return res.json()
      })
      .then(res => {
        var tamanho = res.documents
        console.log("nova tamanho " + tamanho.length)
        this.setState({ msgnova: tamanho.length })
        this.setState({ qtdmsg: this.state.msgnova - this.state.msginicio })
        console.log(this.state.qtdmsg)
      })
      .catch(error => {
        console.log("Problem occurred");

      });
  }
  async getmensagemcomeco() {
    console.log(`id: ` + this.context.id)
    var urlToFetchDistance = "https://firestore.googleapis.com/v1/projects/marq2-768c9/databases/(default)/documents/usuarios/" + String(this.context.id) + "/chats?orderBy=createdAt"
    await fetch(urlToFetchDistance)
      .then(res => {
        return res.json()
      })
      .then(res => {
        var tamanho = res.documents
        this.setState({ msginicio: tamanho.length })

      })
      .catch(error => {
        console.log("Problem occurred");

      });
  }

  render() {
    const GOOGLE_MAPS_APIKEY = 'SUA_API_GOOGLE';
    const region = this.state.region;
    const origin = { latitude: -23.7113111, longitude: -46.5884565 };
    const destination = { latitude: parseFloat(this.state.Hospital.latitude), longitude: parseFloat(this.state.Hospital.longitude), };
    let tempo = this.state.duracao
    {

    }
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content" />
        <MapView
          customMapStyle={customStyle}
          style={styles.mapStyle}
          initialRegion={{
            latitude: parseFloat(this.state.Hospital.latitude),
            longitude: parseFloat(this.state.Hospital.longitude),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation
        >
          <MapViewDirections
            lineDashPattern={[1000]}
            origin={region}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              this.setState({ duracao: result.duration })
              this.setState({ distancia: result.distance })
            }}

          />

          <Marker
            coordinate={{
              latitude: parseFloat(this.state.Hospital.latitude),
              longitude: parseFloat(this.state.Hospital.longitude),
            }}
            title={this.state.Hospital.nome}
            // title="teste"
            description="Av. Álvaro Guimarães, 3051 - Planalto, São Bernardo do Campo - SP, 09810-010"
            pinColor="blue"
          ><Image source={require('../../assets/hospital.png')} style={{ height: 35, width: 35 }} />
          </Marker>
        </MapView>
        <Chaticone mqtd={this.state.qtdmsg} onPress={() => {
          this.props.navigation.navigate(
            "Chat"
          )

        }}></Chaticone>
        <View style={styles.placeContainer} horizontal>
          <View style={styles.place}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Você esta a {tempo.toFixed(0)} minutos do {this.state.Hospital.nome} </Text>
          </View>
        </View>

      </View>
    );
  }
}
App.contextType = EmailContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  placeContainer: {
    width: '100%',
    maxHeight: 400,
    marginBottom: 40
  },

  place: {
    width: Dimensions.get('window').width - 40,
    maxHeight: 100,
    backgroundColor: "rgba(80,227,194,1)",
    marginHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',

  }
});




