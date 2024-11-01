import * as apiClient from '../../api-client.js';

import ManageHotelForm from '../../forms/ManageHotelForm/ManageHotelForm';
import { toast } from 'sonner';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
		onSuccess: () => {
			toast.success('Hotel Saved!');
			navigate('/');
		},
		onError: (error) => {
			console.error('Error details:', error);
			toast.error('Error Saving Hotel');
		},
	});

	const handleSave = (hotelFormData) => {
		mutate(hotelFormData);
	};

	return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
