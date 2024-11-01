import { useEffect, useState } from 'react';

import PopularLocations from './components/PopularLocation';
import ResultsContainer from '../../components/ResultContainer';
import Search from '@/components/Search';

const Home = () => {
	const [popularDestinationsData, setPopularDestinationsData] = useState({
		isLoading: true,
		data: [],
		errors: [],
	});
	const [hotelsResultsData, setHotelsResultsData] = useState({
		isLoading: true,
		data: [],
		errors: [],
	});

	const apiUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const getInitialData = async () => {
			try {
				const popularDestinationsResponse = await fetch(`${apiUrl}/api/hotels/popularDestinations`, {
					method: 'GET',
				});
				if (!popularDestinationsResponse.ok) {
					throw new Error(`HTTP error! Status: ${popularDestinationsResponse.status}`);
				}
				const popularDestinationsData = await popularDestinationsResponse.json();
				setPopularDestinationsData({
					isLoading: false,
					data: popularDestinationsData.data.elements,
					errors: popularDestinationsData.errors || [],
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
				setPopularDestinationsData({
					isLoading: false,
					data: [],
					errors: [errorMessage],
				});
			}
			try {
				const hotelsResultsResponse = await fetch(`${apiUrl}/api/hotels/hotelsResults`, {
					method: 'GET',
				});
				if (!hotelsResultsResponse.ok) {
					throw new Error(`HTTP error! Status: ${hotelsResultsResponse.status}`);
				}
				const hotelsResultsData = await hotelsResultsResponse.json();
				setHotelsResultsData({
					isLoading: false,
					data: hotelsResultsData.data.elements,
					errors: hotelsResultsData.errors || [],
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
				setHotelsResultsData({
					isLoading: false,
					data: [],
					errors: [errorMessage],
				});
			}
		};

		getInitialData();
	}, [apiUrl]);

	return (
		<div className='space-y-3'>
			<Search />
			<div className='container mx-auto'>
				<PopularLocations popularDestinationsData={popularDestinationsData} />
				<div className='my-8'>
					<h2 className='text-3xl font-medium mb-3 text-slate-700 dark:text-slate-200 text-center my-2'>Handpicked nearby hotels for you</h2>
					<ResultsContainer hotelsResults={hotelsResultsData} enableFilters={false} />
				</div>
			</div>
		</div>
	);
};

export default Home;
