/* eslint-disable react/prop-types */
import Footer from '@/components/Footer';
import Header from '../components/Header';

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='container mx-auto px-5 py-10 flex-1'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
