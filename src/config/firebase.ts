// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyByQnKIVhkdjV3-1i0du4X1TcBMzQ8Q6lU",
	authDomain: "react-social-media-eb083.firebaseapp.com",
	projectId: "react-social-media-eb083",
	storageBucket: "react-social-media-eb083.appspot.com",
	messagingSenderId: "524733693465",
	appId: "1:524733693465:web:e4d8b28c00f2cfca65b488",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
