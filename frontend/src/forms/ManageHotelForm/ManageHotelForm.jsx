import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
/* eslint-disable react/prop-types */
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import DetailsSection from './DetailsSections';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import TypeSection from './TypeSection';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ManageHotelForm = ({ onSave, onDelete, isLoading, hotel }) => {
	const formMethods = useForm();
	const { handleSubmit, reset } = formMethods;
	const { user } = useAuth();
	const { hotelId } = useParams(); // Get hotel ID from URL parameters

	useEffect(() => {
		reset(hotel);
	}, [hotel, reset]);

	const onSubmit = handleSubmit((formDataJson) => {
		const formData = new FormData();
		if (hotel) {
			formData.append('hotelId', hotel._id);
		}
		formData.append('name', formDataJson.name);
		formData.append('city', formDataJson.city);
		formData.append('country', formDataJson.country);
		formData.append('description', formDataJson.description);
		formData.append('type', formDataJson.type);
		formData.append('pricePerNight', formDataJson.pricePerNight.toString());
		formData.append('starRating', formDataJson.starRating.toString());
		formData.append('adultCount', formDataJson.adultCount.toString());
		formData.append('childCount', formDataJson.childCount.toString());
		formData.append('userId', user.uid);

		formDataJson.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility);
		});

		if (formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url);
			});
		}

		Array.from(formDataJson.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile);
		});

		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form className='flex flex-col gap-10' onSubmit={onSubmit}>
				<DetailsSection />
				<TypeSection />
				<FacilitiesSection />
				<GuestsSection />
				<ImagesSection />
				<span className='flex justify-end gap-2'>
					<Button disabled={isLoading} type='submit' className=' disabled:bg-gray-500'>
						{isLoading ? 'Saving...' : 'Save'}
					</Button>
					{/* {hotelId && (
						<Button
							variant='destructive'
							onClick={(e) => {
								e.preventDefault();
								onDelete(hotelId);
							}}>
							Delete
						</Button>
					)} */}
					{hotelId && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant='destructive'>Delete</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>This action cannot be undone. This will permanently delete the hotel and remove your data from our servers.</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={(e) => {
											e.preventDefault();
											onDelete(hotelId);
										}}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageHotelForm;
