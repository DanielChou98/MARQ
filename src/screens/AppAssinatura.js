import React, { useRef, Component } from "react";
import { StyleSheet, View, Button, Image, SafeAreaView } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import MaterialButtonViolet from "../components/MaterialButtonViolet"
import usuarios from "../database/Usuarios";
import { EmailContext } from "../Providers/EmailContext";


export default class AppAssinatura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlerClear: (() => { ref.current.clearSignature() }),
      handleConfirm: (() => {
        console.log("end");
        ref.current.readSignature();
      }),
      style: `.m-signature-pad--footer {display: none; margin: 0px;}`,
      elmState: '',
      Email: this.context,
      foto: '',
    };
    this.useEffect = this.useEffect.bind(this)
  }

  useEffect() {
    this.setState({ foto: '' })
    console.log('entrou useEffect: ' + this.state.foto)
    new usuarios().getByEmail(this.context.Email).then((x) => {
      this.setState({ elmState: x })
    });
  }; //colocar cpf

  componentDidMount() {
    this.useEffect()
  }

  render() {
    return (
      // <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image style={styles.imgPhoto} source={{ uri: `data:image/gif;base64,${this.context.Foto}` }} />
        <View style={styles.row2}>
          <MaterialButtonViolet style={styles.botaoVoltar} titulo='Tirar Foto'
            onPress={() =>
              this.props.navigation.navigate(
                "Camera", { TelaAnterior: 'Assinatura', Hospital: this.props.route.params.Hospital, tempo: this.props.route.params.tempo, Hospitalid: this.props.route.params.Hospitalid }
              )}
          />
        </View>
        <SignatureScreen style={{ paddingTop: 1 }} confirmText="Confirmar" onOK={(img) => {
          console.log(img)
          var newData = { assinatura: img }
          new usuarios().updateUser(this.state.elmState, newData)
        }}
          onEmpty={() => console.log("empty")} clearText="Apagar" imageType={"image/svg+xml"} descriptionText="Assine aqui"  //onOK={handleOK} ref={ref} 
          trimWhitespace="true" />
        <View style={styles.row}>
          <MaterialButtonViolet style={styles.botaoVoltar1} titulo='Entrar na Fila'
            onPress={() => this.props.navigation.navigate(
              "Mapa", { Hospital: this.props.route.params.Hospital, tempo: this.props.route.params.tempo, Hospitalid: this.props.route.params.Hospitalid }
            )}
          />
        </View>
      </SafeAreaView>
    )
  }
}
AppAssinatura.contextType = EmailContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignItems: "flex-end",
    alignContent: "flex-end",
    height: 10,
    padding: 10,
    backgroundColor: "#d8f6ff",
  },
  botaoVoltar: {
    height: 50,
    width: 150

  },
  botaoVoltar1: {
    height: 50,
    width: 150,
    marginBottom: -20,

  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 20
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingTop: 10,
    alignItems: "center",
    paddingBottom: 10,
  },
  imgPhoto: {
    borderRightWidth: 1,
    borderRadius: 1,
    paddingTop: 100,
    width: 300,
    height: 220,
    alignContent: "center",
    alignSelf: "center"
  },
});