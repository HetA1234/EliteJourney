/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../firebase';
import { fetchCurrentUser } from '../api-client'; // Import the API function
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(false); // Admin state

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setIsLoggedIn(!!currentUser);
			setUser(currentUser);
			setLoading(true); // Set loading to true while fetching user data

			if (currentUser) {
				// Fetch current user data from your API
				try {
					const userData = await fetchCurrentUser(currentUser); // API call to fetch user data
					if (userData) {
						// Set the admin status based on the fetched user data
						setAdmin(userData.isAdmin || false);
						setUser(userData);
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
					setAdmin(false);
				}
			} else {
				setAdmin(false); // If no user is logged in, set admin to false
			}

			setLoading(false); // Set loading to false once data is fetched
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, loading, user, admin }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
