const firebase = require("firebase");
// import {firebase} from 'firebase/';
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBaIWhca5JVZSEn6g3hkJi-oZftzsuJatg",
  authDomain: "hosper-57632.firebaseapp.com",
  projectId: "hosper-57632",
  storageBucket: "hosper-57632.appspot.com",
  messagingSenderId: "99209631136",
  appId: "1:99209631136:web:2a1bfc09697053361340c5",
  measurementId: "G-TD7DQ1WLEK",
};

firebase.default.initializeApp(firebaseConfig);

const db = firebase.default.firestore();
const auth = firebase.default.auth();

module.exports = { firebase, db, auth };
