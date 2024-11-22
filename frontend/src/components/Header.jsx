import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
import SignOutButton from './SignOutButton';
import { buttonVariants } from './ui/button';
import { useAuth } from './AuthProvider';

const Header = () => {
	const { isLoggedIn, admin } = useAuth(); // Fetch user login and admin status
	let userLinks = [];

	// Check if the user is logged in
	if (isLoggedIn) {
		// Regular user links
		userLinks = (
			<>
				<Link className='flex items-center text-slate-900 dark:text-white px-3 font-bold hover:text-slate-500 dark:hover:text-slate-200' to='/my-bookings'>
					My Bookings
				</Link>
			</>
		);
	} else {
		// User is not logged in, show Sign In link
		userLinks = (
			<Link to='/login' className={buttonVariants({ variant: 'outline' })}>
				<span className='text-sm font-medium'> Sign In </span>
			</Link>
		);
	}

	// If the user is an admin, add admin-specific links
	if (admin) {
		userLinks = (
			<>
				<Link className='flex items-center text-slate-900 dark:text-white px-3 font-bold hover:text-slate-500 dark:hover:text-slate-200' to='/admin/add-hotel'>
					Add Hotel
				</Link>
				<Link className='flex items-center text-slate-900 dark:text-white px-3 font-bold hover:text-slate-500 dark:hover:text-slate-200' to='/admin/bookings'>
					View Bookings
				</Link>
				{userLinks} {/* Add regular user links after admin links */}
				<SignOutButton />
			</>
		);
	} else if (isLoggedIn) {
		userLinks = (
			<>
				{userLinks} {/* Regular user links for logged-in users */}
				<SignOutButton />
			</>
		);
	}

	return (
		<header className='border-b border-gray-200 bg-gray-50 dark:border-gray-950 dark:bg-zinc-950'>
			<div className='mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-3 lg:px-8'>
				<div className='flex flex-row gap-4 items-center justify-between'>
					<div>
						<Link to='/' className='text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white'>
							EliteExpress
						</Link>
					</div>
					<div className='flex items-center gap-4'>
						<Link to='/' className='flex items-center text-slate-900 dark:text-white px-3 font-bold hover:text-slate-500 dark:hover:text-slate-200'>
							Home
						</Link>
						{userLinks}
						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
