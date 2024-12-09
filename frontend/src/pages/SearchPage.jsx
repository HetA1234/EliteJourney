import * as apiClient from '../api-client';

import { useLocation, useNavigate } from 'react-router-dom';

import FacilitiesFilter from '../components/FacilitiesFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import Pagination from '../components/Pagination';
import PriceFilter from '../components/PriceFilter';
import SearchResultsCard from '../components/SearchResultsCard';
import StarRatingFilter from '../components/StarRatingFilter';
import { useQuery } from 'react-query';
import { useState } from 'react';

const SearchPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Extract query parameters from the URL
	const params = new URLSearchParams(location.search);
	const query = params.get('query') || '';
	const destination = params.get('destination') || '';
	const checkIn = params.get('checkIn') || '';
	const checkOut = params.get('checkOut') || '';
	const adultCount = params.get('adultCount') || '1';
	const childCount = params.get('childCount') || '0';
	const page = parseInt(params.get('page')) || 1;

	const [selectedStars, setSelectedStars] = useState([]);
	const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
	const [selectedFacilities, setSelectedFacilities] = useState([]);
	const [selectedPrice, setSelectedPrice] = useState();
	const [sortOption, setSortOption] = useState('');

	// Building search params based on URL and selected filters
	const searchParams = {
		query,
		destination,
		checkIn,
		checkOut,
		adultCount,
		childCount,
		page: page.toString(),
		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption,
	};

	// Fetch hotel data using react-query
	const { data: hotelData, isLoading } = useQuery(['searchHotels', searchParams], () => apiClient.searchHotels(searchParams));

	const handleStarsChange = (event) => {
		const starRating = event.target.value;
		setSelectedStars((prevStars) => (event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)));
	};

	const handleHotelTypeChange = (event) => {
		const hotelType = event.target.value;
		setSelectedHotelTypes((prevHotelTypes) => (event.target.checked ? [...prevHotelTypes, hotelType] : prevHotelTypes.filter((hotel) => hotel !== hotelType)));
	};

	const handleFacilityChange = (event) => {
		const facility = event.target.value;
		setSelectedFacilities((prevFacilities) => (event.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((prevFacility) => prevFacility !== facility)));
	};

	// Handle page change and update the URL query string accordingly
	const handlePageChange = (newPage) => {
		const newParams = new URLSearchParams(location.search);
		newParams.set('page', newPage);
		navigate(`?${newParams.toString()}`);
	};

	// Handle sorting option change
	const handleSortChange = (event) => {
		setSortOption(event.target.value);
		const newParams = new URLSearchParams(location.search);
		newParams.set('sortOption', event.target.value);
		navigate(`?${newParams.toString()}`);
	};

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
			<div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
				<div className='space-y-5'>
					<h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>Filter by:</h3>
					<StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
					<HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
					<FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
					<PriceFilter selectedPrice={selectedPrice} onChange={(value) => setSelectedPrice(value)} />
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<div className='flex justify-between items-center'>
					<span className='text-xl font-bold'>
						{hotelData?.pagination.total} Hotels found
						{destination ? ` in ${destination}` : ''}
						{query ? ` in ${query}` : ''}
					</span>
					<select value={sortOption} onChange={handleSortChange} className='p-2 border rounded-md dark:bg-slate-800 dark:text-gray-300'>
						<option value=''>Sort By</option>
						<option value='starRating'>Star Rating</option>
						<option value='pricePerNightAsc'>Price Per Night (low to high)</option>
						<option value='pricePerNightDesc'>Price Per Night (high to low)</option>
					</select>
				</div>
				{hotelData?.data.map((hotel) => (
					<SearchResultsCard hotel={hotel} key={hotel.id} />
				))}
				<div>
					<Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={handlePageChange} />
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
