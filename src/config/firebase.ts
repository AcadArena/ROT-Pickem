import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAk41bDSo6VrVI2JhxJ-7mak3qN9bkVDFA",
  authDomain: "remote-overlay-tool.firebaseapp.com",
  projectId: "remote-overlay-tool",
  storageBucket: "remote-overlay-tool.appspot.com",
  messagingSenderId: "614838110160",
  appId: "1:614838110160:web:141fd241470b182313dbd5",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// if (window.location.hostname === "localhost") {
//   projectFirestore.useEmulator("localhost", 8080);
//   projectAuth.useEmulator("http://localhost:9099/");
// }

export default firebase;
export { projectStorage, projectFirestore, projectAuth };
