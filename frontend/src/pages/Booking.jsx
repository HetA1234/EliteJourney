/* eslint-disable react-hooks/exhaustive-deps */
import * as apiClient from '../api-client';

import { useEffect, useState } from 'react';

import BookingDetailsSummary from '../components/BookingDetailsSumamry';
import BookingForm from '../forms/BookingForm/BookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '@/contexts/AppContext';
import { useAuth } from '@/components/AuthProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';

const Booking = () => {
	const search = useSearchContext();
	const { stripePromise } = useAppContext();
	const { hotelId } = useParams();
	const { user } = useAuth();
	const [numberOfNights, setNumberOfNights] = useState(0);
	useEffect(() => {
		console.log(user);
		if (search.checkIn && search.checkOut) {
			const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
			setNumberOfNights(Math.ceil(nights));
		}
	}, [search.checkIn, search.checkOut]);
	const { data: paymentIntentData } = useQuery('createPaymentIntent', () => apiClient.createPaymentIntent(hotelId, numberOfNights.toString()), {
		enabled: !!hotelId && numberOfNights > 0,
	});
	const { data: hotel } = useQuery('fetchMyHotelById', () => apiClient.fetchMyHotelById(hotelId || ''), {
		enabled: !!hotelId,
	});
	if (!hotel) {
		return <></>;
	}

	return (
		<div className='grid md:grid-cols-[1fr_2fr] gap-5'>
			<BookingDetailsSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights} hotel={hotel} />
			{user && paymentIntentData && (
				<Elements
					stripe={stripePromise}
					options={{
						clientSecret: paymentIntentData.clientSecret,
					}}>
					<BookingForm currentUser={user} paymentIntent={paymentIntentData} />
				</Elements>
			)}
		</div>
	);
};

export default Booking;
