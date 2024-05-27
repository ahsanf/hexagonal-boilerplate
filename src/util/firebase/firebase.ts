import * as admin from "firebase-admin"
import { App, applicationDefault } from "firebase-admin/app"
import { FirebaseApp, initializeApp } from "firebase/app"
import { config } from "../../../config/config"

let firebaseApp: App
let firebaseAppClient: FirebaseApp
export const getFirebaseApp = () => firebaseApp
export const getFirebaseAppClient = () => firebaseAppClient

export const initFirebase = () => {
  firebaseApp = admin.initializeApp({
    credential: applicationDefault(),
    storageBucket: config.firebase.storageBucket
  })
  firebaseAppClient = initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId
  })
}