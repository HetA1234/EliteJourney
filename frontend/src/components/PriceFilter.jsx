/* eslint-disable react/prop-types */
const PriceFilter = ({ selectedPrice, onChange }) => {
	return (
		<div>
			<h4 className='text-md font-semibold mb-2'> Max Price</h4>
			<select className='p-2 border rounded-md w-full dark:bg-slate-800 dark:text-gray-300' value={selectedPrice} onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
				<option value=''>Select Max Price</option>
				{[50, 100, 200, 300, 500].map((price) => (
					<option key={price} value={price}>
						{price}
					</option>
				))}
			</select>
		</div>
	);
};

export default PriceFilter;
