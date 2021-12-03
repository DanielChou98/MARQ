import React, { Component, useState } from "react";
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-community/picker";
import { AuthContext } from "../Providers/AuthContext";
import usuarios, { addUsu } from "../database/Usuarios";
import CupertinoButtonInfo from "../components/CupertinoButtonInfo"
import { ScrollView } from "react-native-gesture-handler";

export default class TelaCadastro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
      nome: '',
      CPF: this.context,
      CPFCadastrado: false,
      Email: "",
      EmailCadastrado: false,
      endereco: "",
      nascimento: "",
      senha: "",
      celular: "",
      pagina: "",
      elmState: "",
      sexo: "semsexo",
      cpfOK: false,
      emailOK: false,
      flag: false,
    };

    this.validaCPF = this.validaCPF.bind(this);
    this.validaEMail = this.validaEMail.bind(this);
    this.cadastraUsuario = this.cadastraUsuario.bind(this);
    this.checaFoto = this.checaFoto.bind(this)
  }

  async validaCPF() {
    await new usuarios().getByCpf(this.context.CPF).then((x) => {
      if (x !== null) {
        this.setState({ CPFCadastrado: true });
        console.log(this.state.CPFCadastrado)
      } else {
        this.setState({ CPFCadastrado: false });
        console.log(this.state.CPFCadastrado)
      }
    });
  }

  validaEMail() {
    new usuarios().getByEmail(this.state.Email).then((x) => {
      if (x !== null) {
        this.setState({ EmailCadastrado: true });
      } else {
        console.log(this.state.CPFCadastrado)
        this.setState({ EmailCadastrado: false });
      }
    });
  }


  async cadastraUsuario() {
    { this.state.selectedValue == "Masculino" ? this.state.sexo = 'Masculino' : console.log('deuruim') }
    { this.state.selectedValue == "Feminino" ? this.state.sexo = "Feminino" : console.log('deuruim') }
    { this.state.selectedValue == "Sem" ? this.state.sexo = "Sem" : console.log('deuruim') }
    if (!this.state.CPFCadastrado && !this.state.EmailCadastrado) {
      console.log("CPF" + this.state.CPF);
      console.log("sexo" + this.state.sexo);
      await addUsu({
        nome: this.state.nome,
        endereco: this.state.endereco,
        email: this.state.Email,
        cpf: this.state.CPF,
        convenio: "",
        nascimento: this.state.nascimento,
        senha: this.state.senha,
        celular: this.state.celular,
        plano: "",
        numCon: "",
        valCon: "",
        especialidade: "",
        sintomas: "",
        sexo: this.state.sexo,
        hospital: "",
        imagem: " ",
        assinatura: " ",
        documento: this.props.route.params.imagem,
        consultorio:'',
        sala_triagem:'',
      });
      this.props.navigation.navigate('Convenio');
    }
  }

  checaFoto() {
    if (!this.props.route.params.tirouFoto) {
      return (
        <View style={styles.rect}><Text style={{ marginTop: 55, textAlign: "center" }}>Clique para inserir a foto do seu documento</Text></View>
      )
    } else {
      //console.log('entrou checa foto: ')
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ justifyContent: 'center' }}>Clique na imagem para tirar outra foto</Text>
          <Image style={styles.imgPhoto} source={{ uri: `data:image/gif;base64,${this.props.route.params.imagem}` }} />
        </View>
      )
    }
  }

  render() {
    return (
      // <>
      <ScrollView>
        <View style={styles.container}>

          <TextInput
            placeholder="Insira seu nome completo"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle2}
            Value={this.state.nome}
            onChangeText={(nome) => this.setState({ nome })}
          />

          <TextInput
            placeholder="Insira seu CPF"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle1}
            Value={this.CPF}
            onChangeText={(e) => {
              this.setState({ CPF: e });
              this.context.setCPF(e);
              console.log(e);
            }}
            onBlur={() => {
              this.validaCPF();
            }}
          ></TextInput>
          {this.state.CPFCadastrado ? <Text> CPF ja cadastrado</Text> : null}


          <TextInput
            placeholder="Insira seu e-mail"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle1}
            Value={this.Email}
            onChangeText={(Email) => this.setState({ Email })}
          ></TextInput>

          <TextInput
            placeholder="Insira sua senha"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle1}
            Value={this.senha}
            onChangeText={(senha) => this.setState({ senha })}
            secureTextEntry={true}
          ></TextInput>


          <TextInput
            placeholder="Insira seu endereço"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle1}
            Value={this.endereco}
            onChangeText={(endereco) => this.setState({ endereco })}
          ></TextInput>

          <TextInput
            placeholder="Insira seu celular"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle1}
            Value={this.celular}
            onChangeText={(celular) => this.setState({ celular })}
            keyboardType="phone-pad"
          ></TextInput>

          <TextInput
            placeholder="Insira sua data de nascimento"
            dataDetector="none"
            secureTextEntry={false}
            editable={true}
            style={styles.inputStyle1}
            Value={this.nascimento}
            onChangeText={(nascimento) => this.setState({ nascimento })}
          ></TextInput>

          <Picker
            selectedValue={this.state.selectedValue}
            style={{
              justifyContent: "center",
              backgroundColor: "rgb(230,230,230)",
              borderRadius: 50,
              paddingLeft: 5,
              paddingRight: 12,
              width: 200,
              height: 32,
              marginTop: 28,
              marginLeft: 80,
            }}
            mode="dropdown"
            onValueChange={(selectedValue) => this.setState({ selectedValue })}
          >
            <Picker.Item label="- Selecione o sexo -" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
            <Picker.Item label="Prefiro não Identificar" value="Sem" />
          </Picker>

          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Camera', { TelaAnterior: 'Cadastro', tempo: 1000 });
            this.setState({ tirouFoto: true })
          }}>
            {this.checaFoto()}
          </TouchableOpacity>

          <View style={styles.botaoVoltarRow}>
            <CupertinoButtonInfo style={styles.cupertinoButtonInfo} title='Continuar' onPress={() => {
              this.cadastraUsuario()
              //console.log('entrou')
            }
            }

            ></CupertinoButtonInfo>
          </View>
        </View>
      </ScrollView>
    );
  }
}
TelaCadastro.contextType = AuthContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8f6ff",

  },
  botaoVoltar: {
    height: 36,
    width: 100
  },

  botaoVoltarRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  materialStackedLabelTextbox1: {
    height: 60,
    width: 375,
    marginTop: -726
  },
  materialStackedLabelTextbox2: {
    height: 60,
    width: 375
  },
  materialStackedLabelTextbox3: {
    height: 60,
    width: 375
  },
  materialStackedLabelTextbox4: {
    height: 60,
    width: 375
  },
  materialStackedLabelTextbox5: {
    height: 60,
    width: 375
  },
  materialStackedLabelTextbox6: {
    height: 60,
    width: 375
  },
  materialStackedLabelTextbox7: {
    height: 60,
    width: 375
  },
  materialChipBasic1: {
    width: 150,
    height: 32,
    marginTop: 28,
    marginLeft: 100
  },
  rect: {
    width: 301,
    height: 123,
    backgroundColor: "#E6E6E6",
    marginTop: 11,
    alignSelf: "center"
  },
  cupertinoButtonGrey1: {
    height: 44,
    width: 100,
    marginTop: 16,
    marginLeft: 138
  },
  container1: {
    backgroundColor: "transparent"
  },
  stackedLabel1: {
    fontSize: 15,
    textAlign: "left",
    color: "#000",
    opacity: 0.6,
    paddingTop: 16,
    marginLeft: 10
  },
  inputStyle2: {
    color: "#000",
    fontSize: 16,
    alignSelf: "center",
    backgroundColor: "#fff",
    flex: 1,
    width: 350,
    marginTop: 40,
    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 80,
    shadowColor: "rgba(0,0,0,1)",
  },
  inputStyle1: {
    color: "#000",
    fontSize: 16,
    alignSelf: "center",
    backgroundColor: "#fff",
    flex: 1,
    width: 350,

    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 80,
    shadowColor: "rgba(0,0,0,1)",
  },
  cupertinoButtonInfo: {
    height: 50,
    width: 250,
    backgroundColor: "rgba(80,227,194,1)",
    shadowColor: "rgba(155,155,155,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },

  },
  imgPhoto: {
    borderRightWidth: 1,
    borderRadius: 1,
    paddingTop: 200,
    width: 300,
    height: 250,
    alignContent: "center",
    alignSelf: "center"
  },


});
