import firebase from 'firebase';
import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyB0I8giq1ugEvYAEgpHXoSBXMBNiXCStWY",
    authDomain: "teenhire-b3539.firebaseapp.com",
    databaseURL: "https://teenhire-b3539.firebaseio.com",
    projectId: "teenhire-b3539",
    storageBucket: "teenhire-b3539.appspot.com",
    messagingSenderId: "783356650136"
};
let app = firebase.initializeApp(config);

export const auth = app.auth();