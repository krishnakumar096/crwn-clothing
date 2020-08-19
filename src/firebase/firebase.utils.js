import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCzAqFKmcKZfpgyMWT4RUgptC25g-ZQlYc",
    authDomain: "crwn-db-68fc8.firebaseapp.com",
    databaseURL: "https://crwn-db-68fc8.firebaseio.com",
    projectId: "crwn-db-68fc8",
    storageBucket: "crwn-db-68fc8.appspot.com",
    messagingSenderId: "632367636333",
    appId: "1:632367636333:web:9e5b42804bcfd9ed5d8464",
    measurementId: "G-VQ7WM7FYNZ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;