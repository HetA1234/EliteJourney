import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AddHotel from './pages/AddHotel/AddHotel';
import AuthGate from './components/AuthGate';
import { AuthProvider } from './components/AuthProvider';
import EditHotel from './pages/EditHotel/EditHotel';
import Home from './pages/Home/Home';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'sonner';

const App = () => {
	return (
		<AuthProvider>
			<Toaster />
			<Router>
				<Routes>
					{/* Home route */}
					<Route
						path='/'
						element={
							<Layout>
								<Home />
							</Layout>
						}
					/>

					{/* Public routes (only accessible if not logged in) */}
					<Route
						path='/login'
						element={
							<AuthGate>
								<Layout>
									<Login />
								</Layout>
							</AuthGate>
						}
					/>

					<Route
						path='/signup'
						element={
							<AuthGate>
								<Layout>
									<Signup />
								</Layout>
							</AuthGate>
						}
					/>

					<Route
						path='/add-hotel'
						element={
							<Layout>
								<AddHotel />
							</Layout>
						}
					/>
					<Route
						path='/edit/:hotelId'
						element={
							<Layout>
								<EditHotel />
							</Layout>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
