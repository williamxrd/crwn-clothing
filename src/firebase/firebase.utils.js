import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgOIJj-guwOLz8VGKpaTC8JFI-zN5k0cY",
    authDomain: "crwn-db-fe55f.firebaseapp.com",
    databaseURL: "https://crwn-db-fe55f.firebaseio.com",
    projectId: "crwn-db-fe55f",
    storageBucket: "crwn-db-fe55f.appspot.com",
    messagingSenderId: "389079841360",
    appId: "1:389079841360:web:beb19735766a98ed00af55"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData  
            })
        }catch (error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
