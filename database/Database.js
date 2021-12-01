import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyAwiZrgIKkXOe5Ip6RJFc6sAM2-libdo2c",
  authDomain: "marq-bb757.firebaseapp.com",
  databaseURL: "https://marq-bb757-default-rtdb.firebaseio.com",
  projectId: "marq-bb757",
  storageBucket: "marq-bb757.appspot.com",
  messagingSenderId: "35190464921",
  appId: "1:35190464921:web:a2abbd860ef2d39332f308",
  measurementId: "G-JBLH7JLYSK"
};

export default class Database{
  static db = null;

  
  static getDb(){
    if(!this.db){
      try {
        firebase.initializeApp(config)
      } catch (err) {
        console.log(err);
      }
      this.db = firebase.firestore();

    }
    return this.db;
  }
}
