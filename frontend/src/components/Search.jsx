import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Button } from './ui/button';
import { DateRange } from './ui/DateRange';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useState } from 'react';

const Search = () => {
	const [hotel, setHotel] = useState(''); // State for hotel name
	const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' }); // State for date range
	const [travellers, setTravellers] = useState(''); // State for number of travellers
	const navigate = useNavigate(); // React Router navigation

	// Function to handle search
	const handleSearch = () => {
		const queryParams = new URLSearchParams({
			query: hotel, // Hotel name as the query
			checkIn: dateRange.startDate,
			checkOut: dateRange.endDate,
			travellers: travellers,
		}).toString();

		navigate(`/search?${queryParams}`);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center mb-3 text-slate-600 dark:text-slate-200'>Search Hotels</CardTitle>
				<hr />
			</CardHeader>
			<CardContent className='flex flex-col sm:flex-row justify-center items-center sm:items-end gap-3'>
				{/* Hotel Name Input */}
				<div className='grid w-full max-w-xs items-center gap-1.5'>
					<Label htmlFor='destination'>Hotel</Label>
					<Input type='text' id='destination' placeholder='Hotel Name ??' value={hotel} onChange={(e) => setHotel(e.target.value)} />
				</div>

				{/* Date Range Picker */}
				<div className='grid w-full max-w-xs items-center gap-1.5'>
					<Label htmlFor='DateRange'>Dates</Label>
					<DateRange value={dateRange} onChange={(range) => setDateRange(range)} />
				</div>

				{/* Travellers Input */}
				<div className='grid w-full max-w-xs items-center gap-1.5'>
					<Label htmlFor='Travellers'>Travellers</Label>
					<Input type='number' id='Travellers' placeholder='Number of travellers' value={travellers} onChange={(e) => setTravellers(e.target.value)} />
				</div>

				{/* Search Button */}
				<div className='flex items-end justify-center'>
					<Button onClick={handleSearch}>Search</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default Search;
