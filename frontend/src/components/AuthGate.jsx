import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from './AuthProvider';

const AuthGate = ({ children }) => {
	const { isLoggedIn, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>; // Show loading state while checking auth
	}

	if (isLoggedIn) {
		return <Navigate to='/' />;
	}

	return children;
};

export default AuthGate;
