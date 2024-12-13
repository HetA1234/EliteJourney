import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { Link } from 'react-router-dom';


const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { toast } = useToast();

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
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
						<p className='text-[32px] font-bold text-zinc-950 dark:text-white'>Sign In</p>
						<p className='mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400'>Enter your email and password to sign in!</p>

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
									handleLogin();
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
											autoComplete='email'
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
											autoComplete='current-password'
											className='mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400'
											name='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<button className='whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium'>
										Sign in
									</button>
								</div>
							</form>
							<p>
								<Link to="/signup" className="font-medium text-zinc-950 dark:text-white text-sm">
								  Don't have an account? Sign up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
