import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AddHotel from './pages/AddHotel/AddHotel';
import AdminRoute from './components/AdminRoute';
import AllBookings from './pages/AllBookings';
import AuthGate from './components/AuthGate';
import Booking from './pages/Booking';
import Detail from './pages/Detail';
import EditHotel from './pages/EditHotel/EditHotel';
import Home from './pages/Home/Home';
import Layout from './layout/Layout';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import SearchPage from './pages/SearchPage';
import Signup from './pages/Signup';
import { Toaster } from 'sonner';
import { useAuth } from './components/AuthProvider';

const App = () => {
	const { isLoggedIn } = useAuth();
	return (
		<>
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
					<Route
						path='/search'
						element={
							<Layout>
								<SearchPage />
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
						path='/hotel/:hotelId'
						element={
							<Layout>
								<Detail />
							</Layout>
						}
					/>

					<Route
						path='/admin/add-hotel'
						element={
							<AdminRoute>
								<Layout>
									<AddHotel />
								</Layout>
							</AdminRoute>
						}
					/>
					<Route
						path='admin/bookings'
						element={
							<AdminRoute>
								<Layout>
									<AllBookings />
								</Layout>
							</AdminRoute>
						}
					/>
					<Route
						path='/edit/:hotelId'
						element={
							<AdminRoute>
								<Layout>
									<EditHotel />
								</Layout>
							</AdminRoute>
						}
					/>
					{isLoggedIn && (
						<>
							<Route
								path='/hotel/:hotelId/booking'
								element={
									<Layout>
										<Booking />
									</Layout>
								}
							/>
							<Route
								path='/my-bookings'
								element={
									<Layout>
										<MyBookings />
									</Layout>
								}
							/>
						</>
					)}
				</Routes>
			</Router>
		</>
	);
};

export default App;
