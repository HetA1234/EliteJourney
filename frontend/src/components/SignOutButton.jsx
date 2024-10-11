import { Button } from './ui/button';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const SignOutButton = () => {
	const handleLogOut = async () => {
		try {
			await signOut(auth);
			console.log('User signed out');
		} catch (error) {
			console.error('Error signing out: ', error);
		}
	};

	return (
		<Button variant='outline' onClick={handleLogOut}>
			Sign Out
		</Button>
	);
};

export default SignOutButton;
