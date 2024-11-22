/* eslint-disable react/prop-types */
function BookingCard({ hotels }) {
	return (
		<div className='space-y-5'>
			<h1 className='text-3xl font-bold'>My Bookings</h1>
			{hotels.map((hotel) => (
				<div key={hotel._id}>
					{hotel.bookings.map((booking, index) => (
						<div key={index} className='grid grid-cols-1  lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5 mb-2'>
							<div className='lg:w-full lg:h-[250px]'>
								<img src={hotel.imageUrls[0]} alt={`Image of ${hotel.name}`} className='w-full h-full object-cover object-center' />
							</div>
							<div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
								<div className='text-2xl font-bold'>
									{hotel.name}
									<div className='text-xs font-normal'>
										{hotel.city}, {hotel.country}
									</div>
								</div>
								<div>
									<span className='font-bold mr-2'>Dates: </span>
									<span>
										{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}
									</span>
								</div>
								<div>
									<span className='font-bold mr-2'>Guests:</span>
									<span>
										{booking.adultCount} adults, {booking.childCount} children
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default BookingCard;
