/* eslint-disable react/prop-types */
'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function DateRange({ startDate, endDate, onChange, minDate, maxDate }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' className={cn('w-[300px] justify-start text-left font-normal', !startDate && 'text-muted-foreground')}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{startDate ? (
						endDate ? (
							<>
								{format(startDate, 'LLL dd, y')} - {format(endDate, 'LLL dd, y')}
							</>
						) : (
							format(startDate, 'LLL dd, y')
						)
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar mode='range' selected={{ from: startDate, to: endDate }} onSelect={onChange} minDate={minDate} maxDate={maxDate} numberOfMonths={2} />
			</PopoverContent>
		</Popover>
	);
}
