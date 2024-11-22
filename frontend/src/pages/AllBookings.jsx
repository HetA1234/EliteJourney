// import * as apiClient from '../api-client';

// import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { useMutation, useQuery, useQueryClient } from 'react-query';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { useState } from 'react';

// const AllBookings = () => {
// 	const queryClient = useQueryClient();

// 	// Fetch all bookings
// 	const { data: hotels } = useQuery('fetchAllBookings', apiClient.fetchAllBookings);

// 	// Mutation for deleting a booking
// 	const { mutate, isLoading: isDeleting } = useMutation(apiClient.deleteBooking, {
// 		onSuccess: () => {
// 			toast.success('Booking deleted successfully!');
// 			queryClient.invalidateQueries('fetchAllBookings');
// 		},
// 		onError: (error) => {
// 			console.error('Error deleting booking:', error);
// 			toast.error('Failed to delete booking');
// 		},
// 	});

// 	const [sorting, setSorting] = useState({ key: null, direction: 'asc' });
// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [visibleColumns, setVisibleColumns] = useState({
// 		hotelName: true,
// 		city: true,
// 		name: true,
// 		checkIn: true,
// 		checkOut: true,
// 		adultCount: true,
// 		childCount: true,
// 		actions: true,
// 	});

// 	const handleDelete = (booking) => {
// 		mutate({ hotelId: booking.hotelId, bookingId: booking._id });
// 	};

// 	const handleSort = (key) => {
// 		setSorting((prev) => ({
// 			key,
// 			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
// 		}));
// 	};

// 	const flatData = (hotels || []).flatMap((hotel) =>
// 		hotel.bookings
// 			? hotel.bookings.map((booking) => ({
// 					...booking,
// 					hotelName: hotel.name,
// 					city: hotel.city,
// 					country: hotel.country,
// 					hotelId: hotel._id,
// 			  }))
// 			: []
// 	);

// 	const filteredData = flatData.filter((row) => {
// 		const rowValues = Object.values(row).join(' ').toLowerCase();
// 		return rowValues.includes(searchQuery.toLowerCase());
// 	});

// 	const sortedData = [...filteredData].sort((a, b) => {
// 		if (!sorting.key) return 0;

// 		const valueA = a[sorting.key];
// 		const valueB = b[sorting.key];

// 		if (sorting.key === 'checkIn' || sorting.key === 'checkOut') {
// 			return sorting.direction === 'asc' ? new Date(valueA) - new Date(valueB) : new Date(valueB) - new Date(valueA);
// 		}

// 		return sorting.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
// 	});

// 	const columns = [
// 		{ accessor: 'hotelName', header: 'Hotel Name' },
// 		{ accessor: 'city', header: 'City' },
// 		{ accessor: 'name', header: 'Name', cell: ({ row }) => `${row.firstName} ${row.lastName}` },
// 		{
// 			accessor: 'checkIn',
// 			header: (
// 				<Button variant='ghost' onClick={() => handleSort('checkIn')}>
// 					Check-In
// 					<ArrowUpDown />
// 				</Button>
// 			),
// 			cell: ({ row }) => new Date(row.checkIn).toDateString(),
// 		},
// 		{
// 			accessor: 'checkOut',
// 			header: (
// 				<Button variant='ghost' onClick={() => handleSort('checkOut')}>
// 					Check-Out
// 					<ArrowUpDown />
// 				</Button>
// 			),
// 			cell: ({ row }) => new Date(row.checkOut).toDateString(),
// 		},
// 		{ accessor: 'adultCount', header: 'Adults' },
// 		{ accessor: 'childCount', header: 'Children' },
// 		{
// 			id: 'actions',
// 			header: 'Actions',
// 			cell: ({ row }) => (
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<Button variant='ghost' className='h-8 w-8 p-0'>
// 							<MoreHorizontal />
// 						</Button>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent align='end'>
// 						<DropdownMenuItem onClick={() => console.log('Edit:', row)}>Edit</DropdownMenuItem>
// 						<DropdownMenuSeparator />
// 						<DropdownMenuItem onClick={() => handleDelete(row)} disabled={isDeleting}>
// 							Delete
// 						</DropdownMenuItem>
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			),
// 		},
// 	];

// 	if (!hotels || hotels.length === 0) {
// 		return <span>No bookings found</span>;
// 	}

// 	return (
// 		<div className='w-full'>
// 			<div className='flex items-center py-4'>
// 				<Input placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='max-w-sm' />
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<Button variant='outline' className='ml-auto'>
// 							Columns <ChevronDown />
// 						</Button>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent align='end'>
// 						{Object.keys(visibleColumns).map((columnKey) => (
// 							<DropdownMenuCheckboxItem
// 								key={columnKey}
// 								checked={visibleColumns[columnKey]}
// 								onCheckedChange={(checked) =>
// 									setVisibleColumns((prev) => ({
// 										...prev,
// 										[columnKey]: checked,
// 									}))
// 								}>
// 								{columnKey}
// 							</DropdownMenuCheckboxItem>
// 						))}
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			</div>
// 			<div className='rounded-md border'>
// 				<Table>
// 					<TableHeader>
// 						<TableRow>
// 							{columns
// 								.filter((column) => visibleColumns[column.accessor])
// 								.map((column) => (
// 									<TableHead key={column.accessor || column.id}>{column.header}</TableHead>
// 								))}
// 						</TableRow>
// 					</TableHeader>
// 					<TableBody>
// 						{sortedData.length ? (
// 							sortedData.map((row, rowIndex) => (
// 								<TableRow key={rowIndex}>
// 									{columns
// 										.filter((column) => visibleColumns[column.accessor || column.id])
// 										.map((column) => (
// 											<TableCell key={column.accessor || column.id}>{column.cell ? column.cell({ row }) : row[column.accessor]}</TableCell>
// 										))}
// 								</TableRow>
// 							))
// 						) : (
// 							<TableRow>
// 								<TableCell colSpan={columns.length} className='h-24 text-center'>
// 									No results.
// 								</TableCell>
// 							</TableRow>
// 						)}
// 					</TableBody>
// 				</Table>
// 			</div>
// 		</div>
// 	);
// };

import * as apiClient from '../api-client';

import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
// export default AllBookings;
import { useState } from 'react';

const AllBookings = () => {
	const queryClient = useQueryClient();

	// Fetch all bookings
	const { data: hotels } = useQuery('fetchAllBookings', apiClient.fetchAllBookings);

	// Mutation for deleting a booking
	const { mutate: deleteBooking, isLoading: isDeleting } = useMutation(apiClient.deleteBooking, {
		onSuccess: () => {
			toast.success('Booking deleted successfully!');
			queryClient.invalidateQueries('fetchAllBookings');
		},
		onError: (error) => {
			console.error('Error deleting booking:', error);
			toast.error('Failed to delete booking');
		},
	});

	// Mutation for updating a booking
	const { mutate: updateBooking, isLoading: isUpdating } = useMutation(apiClient.updateBooking, {
		onSuccess: () => {
			toast.success('Booking updated successfully!');
			queryClient.invalidateQueries('fetchAllBookings');
		},
		onError: (error) => {
			console.error('Error updating booking:', error);
			toast.error('Failed to update booking');
		},
	});

	const [sorting, setSorting] = useState({ key: null, direction: 'asc' });
	const [searchQuery, setSearchQuery] = useState('');
	const [visibleColumns, setVisibleColumns] = useState({
		hotelName: true,
		city: true,
		name: true,
		checkIn: true,
		checkOut: true,
		adultCount: true,
		childCount: true,
		actions: true,
	});
	const [editingRowId, setEditingRowId] = useState(null);
	const [editingHotelId, setEditingHotelId] = useState(null);
	const [editValues, setEditValues] = useState({ checkIn: '', checkOut: '' });

	const handleDelete = (booking) => {
		deleteBooking({ hotelId: booking.hotelId, bookingId: booking._id });
	};

	const handleSort = (key) => {
		setSorting((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	const handleEdit = (row) => {
		setEditingRowId(row._id);
		setEditingHotelId(row.hotelId);
		setEditValues({
			checkIn: new Date(row.checkIn).toISOString().slice(0, 10),
			checkOut: new Date(row.checkOut).toISOString().slice(0, 10),
		});
	};

	const handleSave = (row) => {
		updateBooking({ bookingId: row._id, hotelId: editingHotelId, ...editValues });
		setEditingRowId(null);
		setEditingHotelId(null);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditValues((prev) => ({ ...prev, [name]: value }));
	};

	const flatData = (hotels || []).flatMap((hotel) =>
		hotel.bookings
			? hotel.bookings.map((booking) => ({
					...booking,
					hotelName: hotel.name,
					city: hotel.city,
					country: hotel.country,
					hotelId: hotel._id,
			  }))
			: []
	);

	const filteredData = flatData.filter((row) => {
		const rowValues = Object.values(row).join(' ').toLowerCase();
		return rowValues.includes(searchQuery.toLowerCase());
	});

	const sortedData = [...filteredData].sort((a, b) => {
		if (!sorting.key) return 0;

		const valueA = a[sorting.key];
		const valueB = b[sorting.key];

		if (sorting.key === 'checkIn' || sorting.key === 'checkOut') {
			return sorting.direction === 'asc' ? new Date(valueA) - new Date(valueB) : new Date(valueB) - new Date(valueA);
		}

		return sorting.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
	});

	const columns = [
		{ accessor: 'hotelName', header: 'Hotel Name' },
		{ accessor: 'city', header: 'City' },
		{ accessor: 'name', header: 'Name', cell: ({ row }) => `${row.firstName} ${row.lastName}` },
		{
			accessor: 'checkIn',
			header: (
				<Button variant='ghost' onClick={() => handleSort('checkIn')}>
					Check-In
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => (editingRowId === row._id ? <Input type='date' name='checkIn' value={editValues.checkIn} onChange={handleChange} /> : new Date(row.checkIn).toISOString().slice(0, 10)),
		},
		{
			accessor: 'checkOut',
			header: (
				<Button variant='ghost' onClick={() => handleSort('checkOut')}>
					Check-Out
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => (editingRowId === row._id ? <Input type='date' name='checkOut' value={editValues.checkOut} onChange={handleChange} /> : new Date(row.checkOut).toISOString().slice(0, 10)),
		},
		{ accessor: 'adultCount', header: 'Adults' },
		{ accessor: 'childCount', header: 'Children' },
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) =>
				editingRowId === row._id ? (
					<div className='flex gap-2'>
						<Button variant='ghost' onClick={() => setEditingRowId(null)}>
							Cancel
						</Button>
						<Button variant='primary' onClick={() => handleSave(row)} disabled={isUpdating}>
							Save
						</Button>
					</div>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => handleEdit(row)}>Edit</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => handleDelete(row)} disabled={isDeleting}>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
		},
	];

	if (!hotels || hotels.length === 0) {
		return <span>No bookings found</span>;
	}

	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='max-w-sm' />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{Object.keys(visibleColumns).map((columnKey) => (
							<DropdownMenuCheckboxItem
								key={columnKey}
								checked={visibleColumns[columnKey]}
								onCheckedChange={(checked) =>
									setVisibleColumns((prev) => ({
										...prev,
										[columnKey]: checked,
									}))
								}>
								{columnKey}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							{columns
								.filter((column) => visibleColumns[column.accessor])
								.map((column) => (
									<TableHead key={column.accessor || column.id}>{column.header}</TableHead>
								))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedData.length ? (
							sortedData.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{columns
										.filter((column) => visibleColumns[column.accessor || column.id])
										.map((column) => (
											<TableCell key={column.accessor || column.id}>{column.cell ? column.cell({ row }) : row[column.accessor]}</TableCell>
										))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default AllBookings;
