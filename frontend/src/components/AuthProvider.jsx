/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setIsLoggedIn(!!currentUser);
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, loading, user }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
