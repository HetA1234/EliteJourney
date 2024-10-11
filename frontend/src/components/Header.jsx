import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
import SignOutButton from './SignOutButton';
import { auth } from '../firebase';
import { buttonVariants } from './ui/button';
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	});
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
						{isLoggedIn ? (
							<>
								<Link className='flex items-center text-slate-900 dark:text-white px-3 font-bold hover:text-slate-500 dark:hover:text-slate-200' to='/my-bookings'>
									My Bookings
								</Link>
								<Link className='flex items-center text-slate-900 dark:text-white px-3 font-bold hover:text-slate-500 dark:hover:text-slate-200' to='/my-hotels'>
									My Hotels
								</Link>
								<SignOutButton />
							</>
						) : (
							<Link to='/login' className={buttonVariants({ variant: 'outline' })}>
								<span className='text-sm font-medium'> Sign In </span>
							</Link>
						)}
						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
