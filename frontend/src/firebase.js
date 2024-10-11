import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAd5-f81LWfuyRrYcPkK-yEPyaiXtg0HQc',
	authDomain: 'eliteexpresss.firebaseapp.com',
	projectId: 'eliteexpresss',
	storageBucket: 'eliteexpresss.appspot.com',
	messagingSenderId: '250862552308',
	appId: '1:250862552308:web:968221a3ab6decc5c94aa1',
	measurementId: 'G-GSPQJPW62T',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
