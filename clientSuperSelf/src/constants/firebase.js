import React from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "react-native-dotenv";

const config = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

export { auth, db, storage };
