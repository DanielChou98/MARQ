import firebase from 'firebase/app';
//import firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOP1omhBK24tXV1dGnR1jHmHFOlGSZkI4",
  authDomain: "marq2-768c9.firebaseapp.com",
  projectId: "marq2-768c9",
  storageBucket: "marq2-768c9.appspot.com",
  messagingSenderId: "846953979788",
  appId: "1:846953979788:web:9732fb760997b1041700a9",
  measurementId: "G-2X3M3X3F85"
};

export default class Database{
  static db = null;

  
  static getDb(){
    if(!this.db){
      try {
        firebase.initializeApp(firebaseConfig)
      } catch (err) {
        console.log(err);
      }
      this.db = firebase.firestore();

    }
    return this.db;
  }
}
