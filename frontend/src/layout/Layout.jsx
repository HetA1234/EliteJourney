/* eslint-disable react/prop-types */
import Header from '../components/Header';

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<div className='container mx-auto py-10 flex-1'>{children}</div>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
