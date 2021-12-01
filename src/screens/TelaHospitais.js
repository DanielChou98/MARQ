import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, Dimensions } from "react-native";
import { CheckBox } from 'react-native-elements'
import HospitalInfo from '../components/HospitalInfo'
import { EmailContext } from '../Providers/EmailContext'
import usuarios from '../database/Usuarios'
import { ScrollView } from "react-native-gesture-handler";
import hospitais from '../database/Hospitais'


export default class TelaHospitais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      TodosHospitais: '',
      HOSPITAIS: '',
      hospital: '',
      Email: this.context,
      checado: false,
      elmState: '',
      hospitais: '',
      listaHosp: null,
      Hospital: '',
      usuID: '',
      res: '',
      show: false,

      destinationLat: -23.7242412,
      destinationLong: -46.5815866,
      startLat: this.props.route.params.startLat,
      startLong: this.props.route.params.startLong

    };
    this.useEffect = this.useEffect.bind(this)
    this.getHospitais = this.getHospitais.bind(this)
    this.mapHospitais = this.mapHospitais.bind(this)
    this.mapHospitaisInicial = this.mapHospitaisInicial.bind(this)
    this.listaInicial = this.listaInicial.bind(this)
  }

  componentDidMount() {
    //console.log('startLat: ' + this.state.startLat)
    this.useEffect()

  }
  marq = () => {
    return <Text>{this.state.startLat} KMs</Text>
  }

  async listaInicial() {
    await new usuarios().getAllHospitais(this.state.startLat, this.state.startLong).then((x) => {
      this.setState({ TodosHospitais: x })
      //console.log('listaInicial: ' + Object.values(this.state.TodosHospitais))
    })

    this.setState({
      listaHosp: this.state.TodosHospitais.map(
        (elem, key) => {
          return <HospitalInfo key={key} nome={elem.nome} estrelas={elem.estrelas} distancia={Object.values(this.context.Distancias.find(element => element.nome == elem.nome))[0]} tempo={elem.tempo} onPress={() => {
            //console.log('entrou onpress hospitais antigos: ' + elem.nome)
            this.setState({ hospital: elem.nome })

            new hospitais().getByHospital(elem.nome).then((x) => {
              this.setState({ HospitalID: x.id })
              //console.log('listaInicial: ' + this.state.HospitalID)
              //console.log('listaInicial: ' + this.state.cpf)
              this.context.setHospitais(this.state.HospitalID)
            })
            setTimeout(() => {
              var newData = { hospital: this.state.hospital }
              new usuarios().updateUser(this.state.elmState, newData)
            }, 1000)
            //console.log('entrou onpress hospitais antigos: ' + this.state.hospital)
            this.props.navigation.navigate(
              "Assinatura"
              , { NomeHospital: elem.nome, Hospital: elem, tempo: elem.tempo, Hospitalid: this.state.HospitalID }
            )

          }}></HospitalInfo>
        }
      )
    })

  }



  mapHospitaisInicial() {
    this.setState({
      listaHosp: Object.values(this.state.TodosHospitais).map(
        (elem, key) => {
          //console.log('entrou mapHospitaisInicial: ' + elem.nome)
          return <HospitalInfo key={key} nome={elem.nome} estrelas={elem.estrelas} distancia={Object.values(this.context.Distancias.find(element => element.nome == elem.nome))[0]} tempo={elem.tempo} onPress={() => {
            this.setState({ hospital: elem.nome })
            new hospitais().getByHospital(elem.nome).then((x) => {
              this.setState({ HospitalID: x.id })
              //console.log('listaInicial: ' + this.state.HospitalID)
              //console.log('listaInicial: ' + this.state.cpf)
              this.context.setHospitais(this.state.HospitalID)
            })
            setTimeout(() => {
              var newData = { hospital: this.state.hospital }
              new usuarios().updateUser(this.state.elmState, newData)
            }, 1000)
            this.props.navigation.navigate(
              "Assinatura", { NomeHospital: elem.nome, Hospital: elem, tempo: elem.tempo, Hospitalid: this.state.HospitalID }
            )
          }}></HospitalInfo>
        }
      )
    })
  }

  async getHospitais() {
    await new usuarios().getByConvenio(this.state.convenio).then((x) => {
      this.setState({ HOSPITAIS: x })
      //console.log(Object.values(x))
    })
  }
  useEffect() {
    //console.log('entrou useEffect')
    new usuarios().getByEmail(this.context.Email).then((x) => {
      this.setState({ convenio: x.data().convenio })
      this.setState({ cpf: x.data().cpf })
      this.context.setCpf(x.data().cpf)
      this.context.setId(x.id)
      this.setState({ usuID: x.id })
      //console.log('id usuario ' + this.state.usuID)
      //console.log('id usuario ' + this.state.cpf)
      this.setState({ elmState: x })
    });
    this.listaInicial()
  };

  mapHospitais() {
    this.setState({
      listaHosp: Object.values(this.state.HOSPITAIS).map(
        (elem, key) => {
          //console.log('entrou mapHospitais: ' + elem.nome)
          return <HospitalInfo key={key} nome={elem.nome} estrelas={elem.estrelas} distancia={Object.values(this.context.Distancias.find(element => element.nome == elem.nome))[0]} tempo={elem.tempo} onPress={() => {
            this.setState({ hospital: elem.nome })
            new hospitais().getByHospital(elem.nome).then((x) => {
              this.setState({ HospitalID: x.id })
              //console.log('listaInicial: ' + this.state.HospitalID)
              //console.log('listaInicial: ' + this.state.cpf)
              this.context.setHospitais(x.id)
            })
            setTimeout(() => {
              var newData = { hospital: this.state.hospital }
              new usuarios().updateUser(this.state.elmState, newData)
            }, 1000)

            this.props.navigation.navigate(
              "Assinatura", { NomeHospital: elem.nome, Hospital: elem, tempo: elem.tempo }
            )
          }}></HospitalInfo>
        }
      )
    })
  }


  render() {
    let hospitais = this.state.listaHosp
    {
      if (this.state.show == true) {
        return (
          <Text>Teste!</Text>
        )
      } else {
        return (
          <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.container}>

                <View style={{ marginTop: 80 }}>
                  <CheckBox
                    title='Deseja utilizar o convênio?'
                    checked={this.state.checado}
                    onPress={() => {
                      this.state.checado = !this.state.checado
                      this.getHospitais()
                      setTimeout(() => {
                        //console.log(Object.values(this.state.HOSPITAIS))
                        if (this.state.checado === true) {
                          this.mapHospitais()
                        } else {
                          this.mapHospitaisInicial()
                        }
                      }, 1000)
                    }}
                    style={styles.materialCheckboxWithLabel}
                  ></CheckBox>

                </View>
                <View style={styles.margem}>
                  <Text style={styles.loremIpsum}>Selecione o hospital desejado:</Text>
                </View>
                {hospitais}
              </View>
            </SafeAreaView>
          </ScrollView>
        );
      }
    }
  }
}
TelaHospitais.contextType = EmailContext;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "stretch",
    height: Dimensions.get("window").height,
    backgroundColor: '#d8f6ff'
  },

  materialCheckboxWithLabel: {
    height: 44,
    width: 348,
  },

  loremIpsum: {
    color: "#121212",
    fontSize: 21,
    textAlign: "center"
  },
  margem: {
    marginBottom: 15
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

});