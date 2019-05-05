import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyB0I8giq1ugEvYAEgpHXoSBXMBNiXCStWY",
    authDomain: "teenhire-b3539.firebaseapp.com",
    databaseURL: "https://teenhire-b3539.firebaseio.com",
    projectId: "teenhire-b3539",
    storageBucket: "teenhire-b3539.appspot.com",
    messagingSenderId: "783356650136"
};

firebase.initializeApp(config);
export default firebase;