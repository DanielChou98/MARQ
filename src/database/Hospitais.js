import React,{useContext} from 'react';
import db from './Database';
import firebase from 'firebase';

export default class Hospitais{
constructor(){
    this.hospitais = db.getDb().collection('hospitais');
    console.log(db.getDb())
    this.addUsuFila=this.addUsuFila.bind(this)
    this.getByHospital=this.getByHospital.bind(this)
  }

  async getByHospital(hospital){
    let elm = null;
    await this.hospitais.where("nome", "==", hospital).get().then( (query) => {
      query.forEach( (el) => {
        elm = el;
      } )
    } )
    
    return elm;
  }

  async getFilaByHospitalID(HospitalID,cpf){
    let elm = [];
    let elm_=[]
    let teste=false
    console.log('getFilaByHospital: '+HospitalID)
    await this.hospitais.doc(String(HospitalID)).collection('fila').orderBy("data", "desc").get().then( (query) => {
      query.forEach( (el) => {
        elm.push(el.data());
      } )
    } )
    console.log('ordenado')
    console.log(Object.values(elm))

    let reverse=elm.reverse()
    // console.log('reverse')
    // console.log(Object.values(reverse))

    reverse.forEach((el)=>{
      console.log(cpf)
      console.log('cpf do banco'+el.cpf)
      if (teste==false){
        if (String(el.cpf)===String(cpf)){
          elm_.push(el)
          teste=true
        }
        else{
          elm_.push(el)
        }
      }
    }
    )
    
    reverse=elm_.reverse()
    console.log(Object.values(reverse))
    return reverse;

  }

  addUsuFila(cpf,id,HospitalID){   
      console.log('hospitalID: '+HospitalID)
      console.log('hospitalID: '+(HospitalID))
      db.getDb().collection('hospitais').doc(String(HospitalID)).collection('fila').add({
        cpf:cpf,
        data: firebase.firestore.FieldValue.serverTimestamp(),
        usuarioID:id,
        virtual:true
      });
     }

}