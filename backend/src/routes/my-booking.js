import Hotel from '../models/hotels.js';
import express from 'express';

const router = express.Router();

// /api/my-bookings
router.get('/booking/:userId', async (req, res) => {
	try {
		const hotels = await Hotel.find({
			bookings: { $elemMatch: { userId: req.params.userId } },
		});
		const results = hotels.map((hotel) => {
			const userBookings = hotel.bookings.filter((booking) => booking.userId === req.params.userId);
			const hotelWithUserBookings = {
				...hotel.toObject(),
				bookings: userBookings,
			};

			return hotelWithUserBookings;
		});

		res.status(200).send(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Unable to fetch bookings' });
	}
});
// /api/my-bookings/all
router.get('/all', async (req, res) => {
	try {
		const hotels = await Hotel.find();

		// Mapping through hotels to return all bookings
		const results = hotels.map((hotel) => {
			const hotelWithAllBookings = {
				...hotel.toObject(),
				bookings: hotel.bookings, // Include all bookings
			};

			return hotelWithAllBookings;
		});

		res.status(200).send(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Unable to fetch bookings' });
	}
});
// DELETE /api/bookings - Delete a specific booking
router.delete('/bookings', async (req, res) => {
	console.log(req.body);
	try {
		const { hotelId, _id: bookingId } = req.body; // Extract hotelId and bookingId from the request body

		if (!hotelId || !bookingId) {
			return res.status(400).json({ message: 'Hotel ID and Booking ID are required' });
		}

		// Find the hotel
		const hotel = await Hotel.findById(hotelId);
		if (!hotel) {
			return res.status(404).json({ message: 'Hotel not found' });
		}

		// Find the booking index
		const bookingIndex = hotel.bookings.findIndex((booking) => booking._id.toString() === bookingId);
		if (bookingIndex === -1) {
			return res.status(404).json({ message: 'Booking not found' });
		}

		// Remove the booking
		hotel.bookings.splice(bookingIndex, 1);

		// Save the updated hotel document
		await hotel.save();

		res.status(200).json({ message: 'Booking deleted successfully' });
	} catch (error) {
		console.error('Error deleting booking:', error);
		res.status(500).json({ message: 'Error deleting booking' });
	}
});

// PATCH /api/bookings - Update booking dates
router.patch('/editBookings', async (req, res) => {
	try {
		const { hotelId, bookingId, checkIn, checkOut } = req.body;
		console.log(hotelId, bookingId, checkIn, checkOut);
		// Validate request data
		if (!hotelId || !bookingId || !checkIn || !checkOut) {
			return res.status(400).json({ message: 'Hotel ID, Booking ID, Check-In, and Check-Out are required' });
		}

		// Find the hotel
		const hotel = await Hotel.findById(hotelId);
		if (!hotel) {
			return res.status(404).json({ message: 'Hotel not found' });
		}

		// Find the booking
		const booking = hotel.bookings.find((b) => b._id.toString() === bookingId);
		if (!booking) {
			return res.status(404).json({ message: 'Booking not found' });
		}

		// Update the booking dates
		booking.checkIn = new Date(checkIn);
		booking.checkOut = new Date(checkOut);

		console.log(checkOut);

		// Save the updated hotel document
		await hotel.save();

		res.status(200).json({ message: 'Booking updated successfully', booking });
	} catch (error) {
		console.error('Error updating booking:', error);
		res.status(500).json({ message: 'Error updating booking' });
	}
});

export default router;
