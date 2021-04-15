import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-functions';
import 'firebase/firestore';
import 'firebase/storage';

const {
	REACT_APP_FIREBASE_API_KEY: apiKey,
	REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
	REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
	REACT_APP_FIREBASE_PROJECT_ID: projectId,
	REACT_APP_FIREBASE_STORAGE_BUCKET: storageBucket,
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
	REACT_APP_FIREBASE_APP_ID: appId,
	REACT_APP_FIREBASE_MEASUREMENT_ID: measurementId,
} = process.env;

var config = {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	measurementId,
};

firebase.initializeApp(config);
export const database = firebase.firestore();
export const storage = firebase.storage();
// export const functions = firebase.functions();
export default firebase;
