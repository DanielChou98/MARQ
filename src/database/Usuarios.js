import React,{Component} from 'react';
import db from './Database';
import firebase from 'firebase';
import * as Location from 'expo-location'
import { EmailContext } from '../Providers/EmailContext'


export default class Usuarios extends Component{
  constructor(props){
    super(props)
    this.state ={
      startLat:'',
      startLong:'',
      distance:[],
      context:this.context

    }
    //console.log(db.getDb())
    this.usuarios = db.getDb().collection('usuarios');
    this.hospitais = db.getDb().collection('hospitais');
    this.addUsuario = this.addUsuario.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getAllHospitais = this.getAllHospitais.bind(this);
    this.getByCpf = this.getByCpf.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.retornaChat = this.retornaChat.bind(this);
    // this.fetchDistanceBetweenPoints=this.fetchDistanceBetweenPoints.bind(this)
  }

  addUsuario(dados){
      this.usuarios.add(dados);
  }

  async getAll(){
    let elm = [];
    await this.usuarios.get().then( (query) => {
      query.forEach( (el) => {
        elm.push(el);
      } )
    } );
  
    //this.getByCpf("1234").then( res => {
      // this.updateUser(res, {nome: "outro teste"});
    //})
    
    return elm;
  }

  async getAllHospitais(startLat,startLong){
    let elm = [];
    await this.hospitais.get().then( (query) => {
      query.forEach( (el) => {
          console.log('element ID: '+ el.id)

          elm.push(el.data());
      } )
    } );  
      console.log('retornou')
      return elm;
  }

 async retornaChat(id){
    const chatsRef = await db.getDb().collection('usuarios').doc(String(id)).collection('chats')
    console.log('chatsref dentro de usuarios'+chatsRef)
    return chatsRef
  }


  // async getAllHospitais(){
  //   let elm = [];
  //   await this.hospitais.get().then( (query) => {
  //     query.forEach( (el) => {
  //       console.log('element ID: '+ el.id)
  //       elm.push(el.id);
  //     } )
  //   } );
  
  //   //this.getByCpf("1234").then( res => {
  //     // this.updateUser(res, {nome: "outro teste"});
  //   //})
    
  //   return elm;
  // }


async getByCpf(cpf){
  let elm = null;
  await this.usuarios.where("cpf", "==", cpf).get().then( (query) => {
    query.forEach( (el) => {
      elm = el;
    } )
  } )
  
  return elm;
}


async getByConvenio(convenio){
  let elm=[]
  this.hospitais.where('convenio', 'array-contains', convenio).get().then( (query) => {
                query.forEach( (el) => {
                  console.log('TESTE: '+el.data().nome)
                  elm.push(el.data());
                } )
              } )
              return elm
}
// async getByConvenio(convenio){
//   let elm=null
//   let IDsHospitais=this.getAllHospitais()
//   (await IDsHospitais).forEach((x)=>{
//     if (x.convenio.search(convenio)>=0){

//     }
//     this.hospitais.where("convenio", "==", convenio).get().then( (query) => {
//             query.forEach( (el) => {
//               console.log('TESTE: '+el.data().nome)
//               elm.push(el.data());
//             } )
//           } )
//   })
//   return elm
//   }

// async getByConvenio(convenio){
//   let IDsHospitais=this.getAllHospitais()
//   console.log('Teste dentro de usuarios getAllHospitais: '+convenio)
//   let elm = [];
//   (await IDsHospitais).forEach((x)=>{
//     this.hospitais.doc(x).collection('convenio').where("nome", "==", convenio).get().then( (query) => {
//       query.forEach( (el) => {
//         console.log('TESTE: '+el.data().nome)
//         elm.push(el.data());
//       } )
//     } )
//   })
//   return elm;
// }
async getByHospital(hospital){
  let elm = null;
  await this.hospitais.where("nome", "==", hospital).get().then( (query) => {
    query.forEach( (el) => {
      elm = el;
    } )
  } )
  
  return elm;
}


async getByEmail(email){
  let elm = null;
  await this.usuarios.where("email", "==", email).get().then( (query) => {
    query.forEach( (el) => {
      elm = el;
    } )
  } )
  
  return elm;
}
async getBySenha(senha){
  let elm = null;
  await this.usuarios.where("senha", "==", senha).get().then( (query) => {
    query.forEach( (el) => {
      elm = el;
    } )
  } )
  
  return elm;
}

 async updateUser(el, newData){
  this.usuarios.doc(el.id).update(newData);
}



}
Usuarios.contextType = EmailContext;



 


export function addUsu(usuario){   
  db.getDb().collection('usuarios').doc(usuario.cpf).set({  
       nome:usuario.nome,  
       endereco:usuario.endereco,
       email:usuario.email,
       cpf:usuario.cpf,
       convenio:usuario.convenio,
       celular:usuario.celular,
       senha:usuario.senha,
       nascimento:usuario.nascimento,
       plano: usuario.plano,
       numCon: usuario.numCon,
       valCon: usuario.valCon,
       especialidade: usuario.especialidade,
       sintomas: usuario.sintomas,
       sexo: usuario.sexo,
       hospital:usuario.hospital,
       imagem:usuario.imagem,
       assinatura:usuario.assinatura,
       virtual:true,
       documento:usuario.documento,
       })

      
      }
