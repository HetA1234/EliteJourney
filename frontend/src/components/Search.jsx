import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Button } from './ui/button';
import { DateRange } from './ui/DateRange';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Search = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center mb-3 text-slate-600 dark:text-slate-200'>Search Hotels</CardTitle>
				<hr />
			</CardHeader>
			<CardContent className='flex flex-col sm:flex-row justify-center items-center sm:items-end gap-3'>
				<div className='grid w-full max-w-xs items-center gap-1.5'>
					<Label htmlFor='destination'>Where To</Label>
					<Input type='text' id='destination' placeholder='Where to ??' />
				</div>
				<div className='grid w-full max-w-xs items-center gap-1.5'>
					<Label htmlFor='DateRange'>Dates</Label>
					<DateRange />
				</div>
				<div className='grid w-full max-w-xs items-center gap-1.5'>
					<Label htmlFor='Travellers'>Travellers</Label>
					<Input type='number' id='Travellers' placeholder='' />
				</div>
				<div className='flex items-end justify-center'>
					<Button>Search</Button>
				</div>
			</CardContent>
		</Card>
	);
};
export default Search;
