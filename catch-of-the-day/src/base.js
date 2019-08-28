import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDeOi0krFKIP7UXakkych6hVJmsCLsmGvE",
    authDomain: "catch-of-the-day-eric-fuller.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-eric-fuller.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
