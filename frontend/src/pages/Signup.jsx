import { auth, createUserWithEmailAndPassword } from '../firebase';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password1, setPassword1] = useState('');
	const { toast } = useToast();
	const apiUrl = import.meta.env.VITE_API_URL;

	const handleSignup = async () => {
		try {
			if (password != password1) {
				toast({
					variant: 'destructive',
					title: `Password Doesn't match`,
				});
			} else {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				const user = userCredential.user;
				const response = await fetch(`${apiUrl}/api/users/saveUser`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						uid: user.uid,
						email: user.email,
						displayName: user.displayName,
					}),
				});
				if (response.ok) {
					toast({
						title: 'User Created Successfully !',
					});
				}
			}
		} catch (error) {
			console.log(error);
			const errorMessage = error.message;
			toast({
				variant: 'destructive',
				title: errorMessage,
			});
		}
	};
	return (
		<>
			<div className='flex flex-col justify-center items-center bg-white dark:bg-background '>
				<div className='mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:max-w-[50%] lg:px-6'>
					<div className='  flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:max-w-[450px]'>
						<p className='text-[32px] font-bold text-zinc-950 dark:text-white'>Sign Up</p>
						<p className='mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400'>Enter your email and password to sign up!</p>

						<div className='relative my-4'>
							<div className='relative flex items-center py-1'>
								<div className='grow border-t border-zinc-200 dark:border-zinc-700'></div>
								<div className='grow border-t border-zinc-200 dark:border-zinc-700'></div>
							</div>
						</div>
						<div>
							<form
								method='POST'
								onSubmit={(e) => {
									e.preventDefault();
									handleSignup();
								}}>
								<div className='grid gap-2'>
									<div className='grid gap-1'>
										<label htmlFor='email' className='text-zinc-950 dark:text-white'>
											Email
										</label>
										<input
											required
											className='mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400'
											id='email'
											placeholder='name@example.com'
											type='email'
											autoCapitalize='none'
											autoCorrect='off'
											name='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<label className='text-zinc-950 mt-2 dark:text-white' htmlFor='password'>
											Password
										</label>
										<input
											required
											id='password'
											placeholder='Password'
											type='password'
											className='mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400'
											name='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<label className='text-zinc-950 mt-2 dark:text-white' htmlFor='password'>
											Confirm Password
										</label>
										<input
											required
											id='password1'
											placeholder='Password'
											type='password'
											className='mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400'
											name='password1'
											value={password1}
											onChange={(e) => setPassword1(e.target.value)}
										/>
									</div>
									<button
										className='whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium'
										type='submit'>
										Sign Up
									</button>
								</div>
							</form>
							<p>
								<Link to='/login' className='font-medium text-zinc-950 dark:text-white text-sm'>
									Already have an account? Sign in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
