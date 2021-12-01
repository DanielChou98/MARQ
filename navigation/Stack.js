import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Inicial from '../src/screens/Inicial'
import TelaCadastro from '../src/screens/TelaCadastro'
import TelaSintomas from '../src/screens/TelaSintomas'
import TelaConvenio2 from '../src/screens/TelaConvenio2'
import Entrar from '../src/screens/Entrar'
import TelaHospitais from '../src/screens/TelaHospitais'
import AppAssinatura from '../src/screens/AppAssinatura'
import AppCamera from '../src/screens/AppCamera'
import AppMapa from '../src/screens/AppMapa'
import TelaEsqueciASenha from '../src/screens/TelaEsqueciASenha'
import TelaFila from '../src/screens/TelaFila'
import TelaTriagem from '../src/screens/TelaTriagem'
import AppChat from './../src/screens/AppChat'
import TelaConsultorio from '../src/screens/TelaConsultorio'



const Stack = createStackNavigator()

export default props => (
  
  <Stack.Navigator initialRouteName='Inicial' 
  screenOptions={{headerShown:true}}>
      <Stack.Screen name="Inicial">
        {props=> (
          <Inicial {...props} >
            <Inicial/>
          </Inicial>
        )}
      </Stack.Screen>

      <Stack.Screen name="Login"  >
        {props=> (
          <Entrar {...props}>
            <Entrar/>
          </Entrar>
        )}
      </Stack.Screen>

      <Stack.Screen name="EsqueciSenha"  >
        {props=> (
          <TelaEsqueciASenha {...props}>
            <TelaEsqueciASenha/>
          </TelaEsqueciASenha>
        )}
      </Stack.Screen>

      <Stack.Screen name="Cadastro"  >
        {props=> (
          <TelaCadastro {...props} voltar="Inicial">
            <TelaCadastro {...props}/>
          </TelaCadastro>
        )}
        
      </Stack.Screen>

      <Stack.Screen name="Sintomas"  >
        {props=> (
          <TelaSintomas {...props} voltar="Inicial">
            <TelaSintomas/>
          </TelaSintomas>
        )}
      </Stack.Screen>

      <Stack.Screen name="Convenio"  >
        {props=> (
          <TelaConvenio2 {...props} voltar="Inicial">
            <TelaConvenio2/>
          </TelaConvenio2>
        )}
      </Stack.Screen>

      <Stack.Screen name="Hospitais"  >
        {props=> (
          <TelaHospitais {...props} voltar="Inicial" >
            <TelaHospitais />
          </TelaHospitais>
        )}
      </Stack.Screen>
       <Stack.Screen name="Mapa"  >
        {props=> (
          <AppMapa {...props} voltar="Inicial">
            <AppMapa/>
          </AppMapa>
        )}
      </Stack.Screen>

      {<Stack.Screen name="Assinatura"  >
        {props=> (
          <AppAssinatura {...props} voltar="Inicial">
            <AppAssinatura/>
          </AppAssinatura>
        )}
      </Stack.Screen>}

      {<Stack.Screen name="Camera"  >
        {props=> (
          <AppCamera {...props} voltar="Inicial">
            <AppCamera/>
          </AppCamera>
        )}
      </Stack.Screen>}

      {<Stack.Screen name="Fila"  >
        {props=> (
          <TelaFila {...props} voltar="Inicial" NomeHospital={props.route.NomeHospital}>
            <TelaFila {...props}/>
          </TelaFila>
        )}
      </Stack.Screen>}

      {<Stack.Screen name="Triagem"  >
        {props=> (
          <TelaTriagem {...props} voltar="Inicial">
            <TelaTriagem/>
          </TelaTriagem>
        )}
      </Stack.Screen>}
      {<Stack.Screen name="Chat"  >
        {props=> (
          <AppChat {...props} voltar="Inicial">
            <AppChat/>
          </AppChat>
        )}
      </Stack.Screen>}
      {<Stack.Screen name="Consultorio"  >
        {props=> (
          <TelaConsultorio {...props} voltar="Inicial">
            <TelaConsultorio/>
          </TelaConsultorio>
        )}
      </Stack.Screen>}
      

  </Stack.Navigator>
)