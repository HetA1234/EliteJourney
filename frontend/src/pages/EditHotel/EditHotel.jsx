import * as apiClient from '../../api-client';

import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import ManageHotelForm from '../../forms/ManageHotelForm/ManageHotelForm';
import { toast } from 'sonner';

const EditHotel = () => {
	const { hotelId } = useParams();
	const navigate = useNavigate();

	// Fetch hotel data
	const { data: hotel } = useQuery('fetchMyHotelById', () => apiClient.fetchMyHotelById(hotelId || ''), { enabled: !!hotelId });

	// Update hotel mutation
	const { mutate: updateHotel, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {
			toast.success('Hotel Updated!');
			navigate('/');
		},
		onError: () => {
			toast.error('Error Saving Hotel');
		},
	});

	// Delete hotel mutation
	const { mutate: deleteHotel } = useMutation(apiClient.deleteMyHotelById, {
		onSuccess: () => {
			toast.success('Hotel Deleted!');
			navigate('/');
		},
		onError: () => {
			toast.error('Error Deleting Hotel');
		},
	});

	// Save handler
	const handleSave = (hotelFormData) => {
		updateHotel(hotelFormData);
	};

	// Delete handler
	const handleDelete = (hotelId) => {
		deleteHotel(hotelId);
	};

	return <ManageHotelForm hotel={hotel} onSave={handleSave} onDelete={handleDelete} isLoading={isLoading} />;
};

export default EditHotel;
