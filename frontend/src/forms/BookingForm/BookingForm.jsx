/* eslint-disable no-unused-vars */
import * as apiClient from '../../api-client';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSearchContext } from '../../contexts/SearchContext';

/* eslint-disable react/prop-types */

const BookingForm = ({ currentUser, paymentIntent }) => {
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();

	const search = useSearchContext();
	const { hotelId } = useParams();

	const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
		onSuccess: () => {
			toast.success('Booking Saved!');
			navigate('/my-bookings');
		},
		onError: () => {
			toast.error('Error saving booking');
		},
	});

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			userId: currentUser?.uid,
			firstName: currentUser?.firstName || '',
			lastName: currentUser?.lastName || '',
			email: currentUser?.email || '',
			adultCount: search.adultCount,
			childCount: search.childCount,
			checkIn: search.checkIn.toISOString(),
			checkOut: search.checkOut.toISOString(),
			hotelId: hotelId,
			totalCost: paymentIntent.totalCost,
			paymentIntentId: paymentIntent.paymentIntentId,
		},
	});

	const onSubmit = async (formData) => {
		if (!stripe || !elements) {
			return;
		}
		const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
		});
		if (result.paymentIntent?.status === 'succeeded') {
			bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'>
			<span className='text-3xl font-bold'>Confirm Your Details</span>
			<div className='grid grid-cols-2 gap-6'>
				<label className='text-gray-900 dark:text-gray-100 text-sm font-bold flex-1'>
					First Name
					<input
						className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
						type='text'
						{...register('firstName', {
							required: 'First Name is required',
						})}
					/>
					{errors.firstName && <span className='text-red-500 text-sm'>{errors.firstName.message}</span>}
				</label>

				<label className='text-gray-900 dark:text-gray-100 text-sm font-bold flex-1'>
					Last Name
					<input
						className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
						type='text'
						{...register('lastName', {
							required: 'Last Name is required',
						})}
					/>
					{errors.lastName && <span className='text-red-500 text-sm'>{errors.lastName.message}</span>}
				</label>

				<label className='text-gray-900 dark:text-gray-100 text-sm font-bold flex-1'>
					Email
					<input className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' type='text' readOnly disabled {...register('email')} />
				</label>
			</div>

			<div className='space-y-2'>
				<h2 className='text-xl font-semibold'>Your Price Summary</h2>

				<div className='bg-blue-200 dark:bg-gray-700 p-4 rounded-md'>
					<div className='font-semibold text-lg'>Total Cost: $ {paymentIntent.totalCost.toFixed(2)}</div>
					<div className='text-xs'>Includes taxes and charges</div>
				</div>
			</div>

			<div className='space-y-2'>
				<h3 className='text-xl font-semibold'>Payment Details</h3>
				<CardElement id='payment-element' className='border rounded-md p-2 text-sm dark:bg-gray-200' />
			</div>

			<div className='flex justify-end'>
				<Button disabled={isLoading} type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500'>
					{isLoading ? 'Saving...' : 'Confirm Booking'}
				</Button>
			</div>
		</form>
	);
};

export default BookingForm;
