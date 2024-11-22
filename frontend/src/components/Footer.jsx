import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

import { AiOutlineFacebook } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Footer = () => {
	const { isLoggedIn, admin } = useAuth();

	let footerLinks;

	if (isLoggedIn) {
		footerLinks = (
			<>
				<Link className='text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white font-medium transition' to='/my-bookings'>
					My Bookings
				</Link>
			</>
		);

		if (admin) {
			footerLinks = (
				<>
					<Link className='text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white font-medium transition' to='/admin/add-hotel'>
						Add Hotel
					</Link>
					<Link className='text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white font-medium transition' to='/admin/bookings'>
						View Bookings
					</Link>
					{footerLinks}
				</>
			);
		}
	} else {
		footerLinks = (
			<Link className='text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white font-medium transition' to='/login'>
				Sign In
			</Link>
		);
	}

	return (
		<footer className='w-full py-10 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-gray-900'>
			<div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center'>
					<div className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
						<Link to='/'>EliteExpress</Link>
					</div>

					<div className='flex flex-wrap justify-center gap-6 text-lg'>{footerLinks}</div>

					<ul className='flex justify-center space-x-6 mt-8'>
						<li>
							<a href='#' className='text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all'>
								<TwitterLogoIcon />
							</a>
						</li>
						<li>
							<a href='#' className='text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all'>
								<AiOutlineFacebook />
							</a>
						</li>
						<li>
							<a href='#' className='text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all'>
								<InstagramLogoIcon />
							</a>
						</li>
					</ul>

					<p className='mt-8 text-sm text-gray-600 dark:text-gray-400'>&copy; {new Date().getFullYear()} EliteExpress. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
