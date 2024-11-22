const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const addMyHotel = async (hotelFormData) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
			method: 'POST',
			body: hotelFormData,
		});
		if (response.status === 201) {
			return 'Hotel successfully created!';
		}
		const errorBody = await response.json();
		throw new Error(errorBody.message || 'Failed to add hotel');
	} catch (error) {
		console.error('Failed to fetch. Network error:', error);
		throw error;
	}
};

export const updateMyHotelById = async (hotelFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
		method: 'PUT',
		body: hotelFormData,
	});
	if (!response.ok) {
		throw new Error('Failed to update Hotel');
	}
	return response.json();
};

export const fetchMyHotelById = async (hotelId) => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {});
	if (!response.ok) {
		throw new Error('Error fetching Hotels');
	}

	return response.json();
};

export const deleteMyHotelById = async (hotelId) => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/delete/${hotelId}`, {
		method: 'DELETE',
	});
	if (response.status === 201) {
		return 'Hotel deleted created!';
	}
	const errorBody = await response.json();
	throw new Error(errorBody.message || 'Failed to add hotel');
};

export const fetchCurrentUser = async (currentUser) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/users/me/${currentUser.uid}`, {
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('Error fetching user');
		}
		return response.json();
	} catch (error) {
		console.error('Fetch error:', error.message);
		throw error;
	}
};

export const fetchMyHotels = async () => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Error fetching hotels');
	}

	return response.json();
};

export const searchHotels = async (searchParams) => {
	const queryParams = new URLSearchParams();
	queryParams.append('destination', searchParams.destination || '');
	queryParams.append('checkIn', searchParams.checkIn || '');
	queryParams.append('checkOut', searchParams.checkOut || '');
	queryParams.append('adultCount', searchParams.adultCount || '');
	queryParams.append('childCount', searchParams.childCount || '');
	queryParams.append('page', searchParams.page || '');

	queryParams.append('maxPrice', searchParams.maxPrice || '');
	queryParams.append('sortOption', searchParams.sortOption || '');

	searchParams.facilities?.forEach((facility) => queryParams.append('facilities', facility));

	searchParams.types?.forEach((type) => queryParams.append('types', type));
	searchParams.stars?.forEach((star) => queryParams.append('stars', star));
	const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);
	if (!response.ok) {
		throw new Error('Error fetching hotels');
	}

	return response.json();
};

export const fetchHotels = async () => {
	const response = await fetch(`${API_BASE_URL}/api/hotels`);
	if (!response.ok) {
		throw new Error('Error fetching hotels');
	}
	return response.json();
};

export const fetchHotelById = async (hotelId) => {
	const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
	if (!response.ok) {
		throw new Error('Error fetching Hotels');
	}

	return response.json();
};

export const createPaymentIntent = async (hotelId, numberOfNights) => {
	console.log(hotelId, numberOfNights);
	const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify({ numberOfNights }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error fetching payment intent');
	}
	return response.json();
};

export const createRoomBooking = async (formData) => {
	const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		throw new Error('Error booking room');
	}
};

export const fetchMyBookings = async (user) => {
	console.log(user.uid);
	const response = await fetch(`${API_BASE_URL}/api/my-bookings/booking/${user.uid}`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Unable to fetch bookings');
	}

	return response.json();
};

export const fetchAllBookings = async () => {
	const response = await fetch(`${API_BASE_URL}/api/my-bookings/all`, {
		credentials: 'include',
	});
	if (!response.ok) {
		throw new Error('Unable to fetch bookings');
	}
	return response.json();
};

export const deleteBooking = async (id) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/my-bookings/bookings`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				hotelId: id.hotelId,
				_id: id.bookingId,
			}),
		});

		if (response.ok) {
			return 'Booking deleted successfully!';
		}
		throw new Error('Failed to delete booking');
	} catch (error) {
		console.error('Error deleting booking:', error);
		throw error;
	}
};

export const updateBooking = async ({ bookingId, hotelId, checkIn, checkOut }) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/my-bookings/editBookings`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ checkIn, checkOut, hotelId, bookingId }),
		});

		if (response.ok) {
			const updatedBooking = await response.json();
			console.log(updatedBooking);
			return updatedBooking;
		}
		throw new Error('Failed to update booking');
	} catch (error) {
		console.error('Error updating booking:', error);
		throw error;
	}
};
