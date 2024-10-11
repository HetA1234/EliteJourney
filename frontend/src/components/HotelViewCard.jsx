import { Check, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { formatPrice } from '../lib/priceHelper';

const HotelViewCard = (props) => {
	const { id: hotelCode, image, title, subtitle, benefits, price, ratings } = props;
	const navigate = useNavigate();

	const onBookNowClick = () => {
		navigate(`/hotel/${hotelCode}`);
	};

	return (
		<Link to={`/hotel/${hotelCode}`} className='block text-slate-700 hover:text-brand transition-colors duration-300'>
			<div className=' cursor-pointer card border p-4 flex flex-col md:flex-row gap-x-2 w-full'>
				<div>
					<img src={image} alt={title} className=' w-full h-[200px] ' />
				</div>
				<div className='flex flex-col justify-between ml-0 md:ml-2 flex-1'>
					<div>
						<h4 className='text-2xl font-bold text-slate-600'>{title}</h4>
						<p className='text-slate-600 text-sm'>{subtitle}</p>
					</div>
					<ul className='flex gap-3'>
						{benefits.length > 0 &&
							benefits.map((benefit, index) => (
								<li className='text-green-800 dark:text-green-400 font-medium text-sm' key={index}>
									<Check /> {benefit}
								</li>
							))}
					</ul>
				</div>
				<div className=' dark:text-slate-200 text-slate-900 flex flex-col ml-0 md:ml-auto justify-between border-l-0 md:border-l-2 items-stretch pl-0 md:pl-4'>
					<div className='flex justify-start my-3 md:my-0 items-center md:flex-col md:justify-between w-full h-full'>
						<h4 className='font-medium text-sm   bg-brand p-2 flex justify-center items-center'>
							{ratings} <StarFilledIcon />
						</h4>
						<p className=' font-bold whitespace-nowrap'>₹ {formatPrice(price)}</p>
					</div>
					<Button variant={'outline'}>Book Now</Button>
				</div>
			</div>
		</Link>
	);
};

export default HotelViewCard;
