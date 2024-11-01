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
	console.log('deleteing');
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/delete/${hotelId}`, {
		method: 'DELETE',
	});
	if (response.status === 201) {
		return 'Hotel deleted created!';
	}
	const errorBody = await response.json();
	throw new Error(errorBody.message || 'Failed to add hotel');
};
