import React, { Component, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import { EmailContext } from '../Providers/EmailContext'
import { CheckBox } from 'react-native-elements'
import usuarios from '../database/Usuarios'
import { ScrollView } from "react-native-gesture-handler";
import * as Location from 'expo-location'
import CupertinoButtonInfo from "../components/CupertinoButtonInfo"


export default class TelaSintomas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senha: '',
      sintomas: '',
      especialidade: '',
      checado: false,
      checado2: false,
      checado3: false,
      checado4: false,
      checado5: false,
      checado6: false,
      startLat: '',
      startLong: '',
      distance: [],
      Email: this.context,
      elmState: '',
      TodosHospitais: '',
      Pagina: ''
    };
    this.testaPreenchimento = this.testaPreenchimento.bind(this)
    this.useEffect = this.useEffect.bind(this)
    this.proximaPagina = this.proximaPagina.bind(this)
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
    this.listaInicial()
    this.useEffect()
  }

  listaInicial() {
    new usuarios().getAllHospitais().then((x) => {
      x.forEach((el) => {
        this.fetchDistanceBetweenPoints(this.state.startLat, this.state.startLong, el.latitude, el.longitude, el.nome)
      })
      this.setState({ TodosHospitais: x })
      //console.log(Object.values(this.state.TodosHospitais))
      this.context.setHospitais(x)
    })
  }

  fetchDistanceBetweenPoints = async (lat1, lng1, lat2, lng2, nome) => { // Pass Latitude & Longitude of both points as a parameter
    //console.log('element Lat: ' + lat1)
    //console.log('element long: ' + lng1)
    //console.log('element Lat2: ' + lat2)
    //console.log('element long2: ' + lng2)
    var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?&origins=' + lat1 + '%2C' + lng1 + '&destinations=' + lat2 + '%2C' + lng2 + '&key=' + "SUA_API_GOOGLE";
    await fetch(urlToFetchDistance)
      .then(res => {
        return res.json()
      })
      .then(res => {
        var aux = []
        aux = this.state.distance
        var distanceString = res.rows[0].elements[0].distance.text;
        aux.push({ 'distancia': distanceString, 'nome': nome })
        this.setState({ distance: aux })
        //console.log('state distance: ' + this.state.distance)
        // Do your stuff here
        //console.log('dentro do fetch')
        //console.log(Object.values(this.state.distance))

      })
  }

  async testaPreenchimento() {
    if (this.state.especialidade == '' || this.state.sintomas == '') {
      this.state.Pagina = 'Sintomas'
    } else {
      this.state.Pagina = 'Hospitais'
    }
  }
  async proximaPagina() {
    var newData = { especialidade: this.state.especialidade, sintomas: this.state.sintomas }
    new usuarios().updateUser(this.state.elmState, newData)
    await this.props.navigation.navigate(
      this.state.Pagina,
      {
        TodosHospitais: Object.values(this.state.TodosHospitais),
        startLat: this.props.route.params.startLat, startLong: this.props.route.params.startLong
      },
      //console.log(Object.values(this.state.distance)),
      this.context.setDistancias(this.state.distance),
      //console.log(Object.values(this.context.Distancias))

    )
  }

  useEffect() {
    new usuarios().getByEmail(this.context.Email).then((x) => {
      this.setState({ elmState: x })
    });
  }; //colocar cpf

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={{}}>
              <Text style={{ fontSize: 20, paddingTop: 10, paddingLeft: 15, paddingBottom: 10 }}>Especialidades *</Text>
              <View style={{ paddingLeft: -200 }}>
                <CheckBox
                  title='Clinico Geral'
                  checked={this.state.checado}
                  onPress={() => {
                    this.state.checado = !this.state.checado
                    this.setState({ especialidade: 'Clinico Geral' })
                    //console.log(this.state.checado);
                    //console.log(this.state.especialidade);
                  }}
                />
                <CheckBox
                  title='Ortopedia'
                  checked={this.state.checado5}
                  onPress={() => {
                    this.state.checado5 = !this.state.checado5
                    this.setState({ especialidade: 'Ortopedia' })
                  }}
                />
              </View>
              <View style={{}}>
                <CheckBox
                  title='Otorrino'
                  checked={this.state.checado2}
                  onPress={() => {
                    this.state.checado2 = !this.state.checado2
                    this.setState({ especialidade: 'Otorrino' })
                  }}
                />
                <CheckBox
                  title='Oftalmologia'
                  checked={this.state.checado4}
                  onPress={() => {
                    this.state.checado4 = !this.state.checado4
                    this.setState({ especialidade: 'Oftalmologia' })
                  }}
                />
              </View>
              <View style={{}}>
                <CheckBox
                  title='Outros'
                  checked={this.state.checado6}
                  onPress={() => {
                    this.state.checado6 = !this.state.checado6
                    this.setState({ especialidade: 'Outros' })
                  }}
                />
              </View>
              <View style={{ paddingTop: 50 }}>
                <Text style={{ alignSelf: "center", fontSize: 20 }}>Descreva os seus sintomas abaixo:</Text>
                <TextInput
                  style={styles.textinputNumero}
                  placeholder="Sintomas"
                  Value={this.state.sintomas}
                  onChangeText={(sintomas) => this.setState({ sintomas })}
                ></TextInput>
              </View>
              <CupertinoButtonInfo style={styles.cupertinoButtonInfo} title='Continuar' onPress={() => {
                this.testaPreenchimento()
                this.proximaPagina()
              }}>
              </CupertinoButtonInfo>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>

    );
  }
}
TelaSintomas.contextType = EmailContext;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f6ff",
  },
  materialCheckboxWithLabel6: {
    height: 78,
    width: 347,
    marginTop: 205,
    marginLeft: 14
  },
  materialCheckboxWithLabel4: {
    height: 28,
    width: 105,
    marginLeft: 89,
    marginTop: 2
  },
  materialCheckboxWithLabel6Row: {
    height: 33,
    flexDirection: "row",
    marginTop: 146,
    marginLeft: 32,
    marginRight: 56
  },
  materialCheckboxWithLabel7: {
    height: 28,
    width: 105
  },
  materialCheckboxWithLabel8: {
    height: 28,
    width: 95,
    marginLeft: 88
  },
  materialCheckboxWithLabel7Row: {
    height: 28,
    flexDirection: "row",
    marginTop: 45,
    marginLeft: 26,
    marginRight: 61
  },
  materialCheckboxWithLabel9: {
    height: 22,
    width: 102
  },
  materialCheckboxWithLabel10: {
    height: 29,
    width: 95,
    marginLeft: 90
  },
  materialCheckboxWithLabel9Row: {
    height: 29,
    flexDirection: "row",
    marginTop: 46,
    marginLeft: 27,
    marginRight: 61
  },
  especialidades: {
    fontFamily: "roboto-regular",
    color: "#121212",
    lineHeight: 20,
    fontSize: 27,
    marginTop: -253,
    marginLeft: 15
  },
  materialFixedLabelTextbox: {
    height: 151,
    width: 343,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 312,
    marginLeft: 15
  },
  sintomas: {
    fontFamily: "roboto-regular",
    color: "#121212",
    lineHeight: 20,
    fontSize: 27,
    marginTop: -203,
    marginLeft: 15
  },
  materialButtonViolet2: {
    height: 36,
    width: 100,
    marginTop: 64,
    marginLeft: 137
  },

  textinputNumero: {
    height: 200,
    margin: 12,
    width: 300,
    borderWidth: 1,
    alignSelf: "center"
  },
  cupertinoButtonInfo: {
    height: 61,
    width: 325,
    alignSelf: "center",
    backgroundColor: "rgba(80,227,194,1)",
    shadowColor: "rgba(155,155,155,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
  },
});
