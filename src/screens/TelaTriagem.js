import React, { useState, Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Dimensions
} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import CupertinoButtonInfo from '../components/CupertinoButtonInfo';
import { EmailContext } from '../Providers/EmailContext';
import usuarios from '../database/Usuarios';


export default class TelaTriagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrValue: null,
            elmState: '',
            triagem1:'',
            triagem2:'',
            cpf:'',
            nome:'',
            nascimento:'',
            
        };
        this.useEffect=this.useEffect.bind(this)
    }

    componentDidMount(){
        this.useEffect()
        var interval =setInterval(() => {
             new usuarios().getByEmail(this.context.Email).then((x) => {
                //console.log('consultorio2: '+x.data().consultorio)
                this.setState({ triagem2: x.data().sala_triagem })
                
            });
            //console.log(`consultorio1`+this.state.consultorio1)
            //console.log('Teste: '+this.state.consultorio1 != this.state.consultorio2)
            if (this.state.triagem1 != this.state.triagem2){
                this.props.navigation.navigate('Consultorio');
            }
          }, 10000)
    }

    async useEffect() {
        //console.log('entrou useEffect')
        await new usuarios().getByEmail(this.context.Email).then((x) => {
            //console.log(x.data().cpf)
            this.setState({ triagem1: x.data().sala_triagem })
            this.setState({elmState:x.data().nome +"\n"+ x.data().cpf +"\n"+ x.data().nascimento})
            //this.setState({cpf:x.data().cpf})
        });
    };

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.containerQr}>
                        <QRCode
                            value={this.state.qrValue ? this.state.qrValue : 'NA'}
                           //value={"https://firestore.googleapis.com/v1/projects/marq2-768c9/databases/(default)/documents/usuarios/" + String(this.state.cpf)}
                            //value="dadsadsad"
                           size={250}
                            color="black"
                            backgroundColor="white"
                            //logo={require('../../assets/icon.png')}
                            //logoSize={30}
                            //logoMargin={2}
                            //logoBorderRadius={15}
                            //logoBackgroundColor="yellow"
                        />
                    </View>
                    <View style={styles.margem}>
                        <Text style={styles.loremIpsum}>Dirija-se à sala {this.state.triagem1} e mostre o QR Code quando chegar!</Text>
                    </View>
                    <View style={styles.margem}>
                        <CupertinoButtonInfo
                            style={styles.cupertinoButtonInfo}
                            onPress={() => this.setState({ qrValue: this.state.elmState } )}
                            title="Gerar QR Code"
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }

}
TelaTriagem.contextType = EmailContext;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "stretch",
        backgroundColor: "#d8f6ff",
        height: Dimensions.get("window").height,
    },

    containerQr: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5
    },

    margem: {
        marginBottom: 15
    },

    loremIpsum: {
        color: "#121212",
        fontSize: 21,
        textAlign: "center"
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
    },
})
