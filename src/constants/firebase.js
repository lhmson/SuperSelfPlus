import React from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: SOME_KEY,
  authDomain: SOME_DOMAIN,
  projectId: SOME_PROJECTID,
  storageBucket: SOME_BUCKET,
  messagingSenderId: SOME_SENDER_ID,
  appId: SOME_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var firestore = firebase.firestore;

var db = firebase.firestore();

var storage = firebase.storage();

export { db, storage, firestore };
