import { useFormContext } from 'react-hook-form';

const GuestsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<h2 className='text-2xl font-bold mb-3'>Guests</h2>
			<div className='grid grid-cols-2 p-6 gap-5 dark:bg-gray-900 bg-gray-300'>
				<label className='dark:text-gray-100 text-gray-700 text-sm font-semibold'>
					Adults
					<input
						className=' dark:bg-slate-200 dark:text-gray-900  border rounded w-full py-2 px-3 font-normal'
						type='number'
						min={1}
						{...register('adultCount', {
							required: 'This field is required',
						})}
					/>
					{errors.adultCount?.message && <span className='text-red-500 text-sm fold-bold'>{errors.adultCount?.message}</span>}
				</label>
				<label className='dark:text-gray-100 text-gray-700 text-sm font-semibold'>
					Children
					<input
						className='dark:bg-slate-200 dark:text-gray-900 border rounded w-full py-2 px-3 font-normal'
						type='number'
						min={0}
						{...register('childCount', {
							required: 'This field is required',
						})}
					/>
					{errors.childCount?.message && <span className='text-red-500 text-sm fold-bold'>{errors.childCount?.message}</span>}
				</label>
			</div>
		</div>
	);
};

export default GuestsSection;
