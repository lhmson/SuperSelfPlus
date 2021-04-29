import React from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { db, storage } from "../constants/firebase";

const User = {
  // ok
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  // ok
  createUser: async (user) => {
    try {
      console.log(
        "User:" + user.username + " " + user.password + " " + user.email
      );
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = User.getCurrentUser().uid;
      // let profilePhotoUrl = "default";
      console.log("uid:" + uid);
      await db.collection("Users").doc(uid).set({
        username: user.username,
        email: user.email,
        // profilePhotoUrl,
        gender: "Male",
      });

      // if (user.profilePhoto) {
      //   profilePhotoUrl = await User.uploadProfilePhoto(user.profilePhoto);
      // }
      //delete user.password;
      return { ...user, uid };
    } catch (error) {
      alert("Error when creating user, please try again. " + error.message);
      console.log("Error when creating user ", error);
      return null;
    }
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection("Users").doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      alert("Error when getting user info. ", error.message);
      console.log("Error when getting user info", error);
    }
  },

  logInWithGoogle: async () => {
    try {
      alert("log in with google");
    } catch (error) {
      alert("Error when logging in with google", error.message);
      console.log("Error when logging in with google", error);
    }
  },

  // ok
  logIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  // ok
  logOut: async () => {
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log("Error when logging out ", error);
    }
    return false;
  },

  updateUser: async (userId, info) => {
    try {
      await db
        .collection("Users")
        .doc(userId)
        .set({
          ...info,
        });
      console.log("Success edit user");
    } catch (error) {
      alert("Error when updating user", error.message);
      console.log("Error when updating user", error);
    }
  },

  //#region Photo handle
  // uploadProfilePhoto: async (uri) => {
  //   const uid = User.getCurrentUser().uid;
  //   //console.log(uid);
  //   try {
  //     const photo = await User.getBlob(uri);
  //     const imageRef = storage.ref("profilePhotos").child(uid);
  //     await imageRef.put(photo);
  //     const url = await imageRef.getDownloadURL();
  //     //console.log("Url: " + url);

  //     await db.collection("Users").doc(uid).update({
  //       profilePhotoUrl: url,
  //     });
  //     return url;
  //   } catch (error) {
  //     console.log("Error when uploading profile photo ", error.message);
  //   }
  // },

  // getBlob: async (uri) => {
  //   //console.log("Uri get blob: " + uri);
  //   return await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();

  //     xhr.onload = () => {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = () => {
  //       reject(new TypeError("Network request fails"));
  //     };

  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });
  // },
  //#endregion
};

export default User;
