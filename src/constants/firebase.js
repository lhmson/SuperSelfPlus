import React from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAQi0kpKRqKedEC-sPeKu7pn_4q_-8AHhg",
  authDomain: "superselfplus.firebaseapp.com",
  projectId: "superselfplus",
  storageBucket: "superselfplus.appspot.com",
  messagingSenderId: "463556587324",
  appId: "1:463556587324:web:5c55304493ee3a9e687839",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var firestore = firebase.firestore;

var db = firebase.firestore();

var storage = firebase.storage();

export { db, storage, firestore };
