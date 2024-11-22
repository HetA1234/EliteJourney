/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AdminRoute = ({ children }) => {
	const { isLoggedIn, admin, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>; // Show a loading spinner or placeholder while loading
	}

	if (!isLoggedIn) {
		return <Navigate to='/login' />; // Redirect to login page if not logged in
	}

	if (!admin) {
		return <Navigate to='/' />; // Redirect to home page if not an admin
	}

	return children; // Render the children (protected route content) if the user is an admin
};

export default AdminRoute;
