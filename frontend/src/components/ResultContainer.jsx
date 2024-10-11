import { useRef, useState } from 'react';

import EmptyHotelsState from './EmptyHotelState';
import { FilterIcon } from 'lucide-react';
import HotelViewCard from './HotelViewCard';
import HotelViewCardSkeleton from './Skeleton/HotelViewCardSkeleton';
import Select from 'react-select';
import VerticalFilters from './VerticalFilters';
import VerticalFiltersSkeleton from './Skeleton/VerticalFilerSkeleton';
import useOutsideClickHandler from '../hooks/use-outside-click-handler';

const ResultsContainer = ({
	hotelsResults,
	enableFilters,
	filtersData = [], // Default to empty array if not provided
	selectedFiltersState = [], // Default to empty array if not provided
	onFiltersUpdate,
	onClearFiltersAction,
	sortingFilterOptions = [], // Default to empty array if not provided
	sortByFilterValue = null, // Default to null if not provided
	onSortingFilterChange,
}) => {
	const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);

	const wrapperRef = useRef(null);
	const buttonRef = useRef(null);

	useOutsideClickHandler(wrapperRef, (event) => {
		if (buttonRef.current && !buttonRef.current.contains(event.target)) {
			setIsVerticalFiltersOpen(false);
		}
	});

	const toggleVerticalFiltersAction = () => {
		setIsVerticalFiltersOpen((prevState) => !prevState);
	};

	const isSortingFilterVisible = sortingFilterOptions.length > 0;

	return (
		<div className='relative'>
			<div className='flex gap-x-0 md:gap-x-4 items-start mx-2'>
				{enableFilters && selectedFiltersState.length > 0 && (
					<div ref={wrapperRef}>
						<VerticalFilters filtersData={selectedFiltersState} onFiltersUpdate={onFiltersUpdate} onClearFiltersAction={onClearFiltersAction} isVerticalFiltersOpen={isVerticalFiltersOpen} />
					</div>
				)}
				{enableFilters && filtersData.length === 0 && <VerticalFiltersSkeleton />}
				<div className='flex flex-col w-full items-start'>
					<div className='flex w-full justify-between px-2 md:px-0'>
						{enableFilters && (
							<div className='vertical-filters__toggle-menu block md:hidden'>
								<button
									ref={buttonRef}
									data-testid='vertical-filters__toggle-menu'
									onClick={toggleVerticalFiltersAction}
									className='inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
									<FilterIcon /> Filters
								</button>
							</div>
						)}
						{isSortingFilterVisible && <Select value={sortByFilterValue} onChange={onSortingFilterChange} options={sortingFilterOptions} className='mb-2 w-[180px] text-sm' />}
					</div>
					<div className='hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full'>
						{hotelsResults.isLoading ? (
							Array.from({ length: 5 }, (_, index) => <HotelViewCardSkeleton key={index} />)
						) : hotelsResults.data && hotelsResults.data.length > 0 ? (
							hotelsResults.data.map((hotel) => (
								<HotelViewCard key={hotel._id} id={hotel._id} title={hotel.name} image={hotel.imageUrls[0]} subtitle={hotel.description} benefits={hotel.facilities} ratings={hotel.starRating} price={123} />
							))
						) : (
							<EmptyHotelsState />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultsContainer;
