import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AuthGate from './components/AuthGate';
import { AuthProvider } from './components/AuthProvider';
import Home from './pages/Home/Home';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
	return (
		<AuthProvider>
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
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
