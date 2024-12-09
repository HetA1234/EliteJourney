/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { DateRange } from '@/components/ui/DateRange';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/AuthProvider';
import { useForm } from 'react-hook-form';
import { useSearchContext } from '../../contexts/SearchContext';

const GuestInfoForm = ({ hotelId, pricePerNight }) => {
	const search = useSearchContext();
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			adultCount: search.adultCount,
			childCount: search.childCount,
		},
	});

	const checkIn = watch('checkIn');
	const checkOut = watch('checkOut');

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const onSignInClick = (data) => {
		search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
		navigate('/login', { state: { from: location } });
	};

	const onSubmit = (data) => {
		search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
		navigate(`/hotel/${hotelId}/booking`);
	};

	return (
		<div className='flex flex-col p-4 gap-4'>
			<form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
				<div className='grid grid-cols-1 gap-4 items-center'>
					<Card>
						<CardHeader>
							<CardTitle className='text-center mb-3 text-slate-600 dark:text-slate-200'>Total Price: ${pricePerNight}</CardTitle>
							<hr />
						</CardHeader>
						<CardContent className='flex flex-col sm:flex-row justify-center items-center sm:items-end gap-3'>
							<div className='grid w-full max-w-xs items-center gap-1.5'>
								<Label htmlFor='adultCount'>Adults</Label>
								<Input
									type='number'
									id='adultCount'
									placeholder='How many Adults?'
									{...register('adultCount', {
										required: 'This field is required',
										min: {
											value: 1,
											message: 'There must be at least one adult',
										},
										valueAsNumber: true,
									})}
								/>
								{errors.adultCount && <span className='text-red-500 font-semibold text-sm'>{errors.adultCount.message}</span>}
							</div>
							<div className='grid w-full max-w-xs items-center gap-1.5'>
								<Label htmlFor='childCount'>Children</Label>
								<Input
									type='number'
									id='childCount'
									placeholder='How many Children?'
									{...register('childCount', {
										valueAsNumber: true,
									})}
								/>
							</div>
							<div className='grid w-full max-w-xs items-center gap-1.5'>
								<Label htmlFor='DateRange'>Dates</Label>
								<DateRange
									startDate={checkIn}
									endDate={checkOut}
									onChange={(date) => {
										setValue('checkIn', date.from);
										setValue('checkOut', date.to);
									}}
									minDate={minDate}
									maxDate={maxDate}
								/>
							</div>
						</CardContent>
					</Card>
					{isLoggedIn ? (
						<Button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl'>Book Now</Button>
					) : (
						<Button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl'>Sign in to Book</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default GuestInfoForm;
