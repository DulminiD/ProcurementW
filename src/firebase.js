import * as firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyBdjP3em_r5nnmOc0e69TRXxq5kUHGYXNc",
    authDomain: "procurement-a8350.firebaseapp.com",
    databaseURL: "https://procurement-a8350.firebaseio.com",
    projectId: "procurement-a8350",
    storageBucket: "procurement-a8350.appspot.com",
    messagingSenderId: "1040527104801",
    appId: "1:1040527104801:web:9db00192d000530e673c60",
    measurementId: "G-S712EBLRP2"
};

firebase.initializeApp(config);

export default firebase.database();
