import { hotelFacilities } from '../../config/hotel-option-config.js';
import { useFormContext } from 'react-hook-form';

const FacilitiesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<h2 className='text-2xl dark:text-gray-100 font-bold mb-3'>Facilities</h2>
			<div className='grid grid-cols-5 gap-3'>
				{hotelFacilities.map((facility) => (
					<label key={facility} className='text-sm flex gap-1 text-gray-700 dark:text-gray-100'>
						<input
							type='checkbox'
							value={facility}
							{...register('facilities', {
								validate: (facilities) => {
									if (facilities && facilities.length > 0) {
										return true;
									} else {
										return 'At least one facility is required';
									}
								},
							})}
						/>
						{facility}
					</label>
				))}
			</div>
			{errors.facilities && <span className='text-red-500 text-sm font-bold'>{errors.facilities.message}</span>}
		</div>
	);
};

export default FacilitiesSection;
