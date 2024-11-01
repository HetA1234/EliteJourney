/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from './AuthProvider';

const AdminGate = ({ children }) => {
	const { isLoggedIn, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>; // Show loading state while checking auth
	}

	if (isLoggedIn) {
		return children;
	}
	return <Navigate to='/' />;
};

export default AdminGate;
