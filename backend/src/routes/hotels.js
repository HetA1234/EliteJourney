import { param, validationResult } from 'express-validator';

import Hotel from '../models/hotels.js';
import PopularDestinations from '../models/popularhotels.js';
import Stripe from 'stripe';
import { config } from 'dotenv';
import express from 'express';

config();

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const router = express.Router();

router.get('/hotelsResults', async (req, res) => {
	try {
		const hotelsResults = await Hotel.find();
		res.status(200).json({
			data: {
				elements: hotelsResults,
			},
			errors: [],
		});
	} catch (error) {
		console.error('Error fetching popular destinations:', error);
		res.status(500).json({
			data: {
				elements: [],
			},
			errors: ['Failed to fetch popular destinations'],
		});
	}
});

router.get('/popularDestinations', async (req, res) => {
	try {
		const popularDestinations = await PopularDestinations.find();
		res.status(200).json({
			data: {
				elements: popularDestinations,
			},
			errors: [],
		});
	} catch (error) {
		console.error('Error fetching popular destinations:', error);
		res.status(500).json({
			data: {
				elements: [],
			},
			errors: ['Failed to fetch popular destinations'],
		});
	}
});

router.get('/search', async (req, res) => {
	try {
		const query = constructSearchQuery(req.query);
		let sortOptions = {};
		switch (req.query.sortOption) {
			case 'starRating':
				sortOptions = { starRating: -1 };
				break;
			case 'pricePerNightAsc':
				sortOptions = { pricePerNight: 1 };
				break;
			case 'pricePerNightDesc':
				sortOptions = { pricePerNight: -1 };
				break;
		}

		const pageSize = 5;
		const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
		const skip = (pageNumber - 1) * pageSize;

		const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);

		const total = await Hotel.countDocuments(query);

		const response = {
			data: hotels,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		};
		res.json(response);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

router.get('/', async (req, res) => {
	try {
		const hotels = await Hotel.find().sort('-lastUpdated');
		res.json(hotels);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Error fetching hotels' });
	}
});

router.get('/:id', [param('id').notEmpty().withMessage('Hotel ID is required')], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const id = req.params.id.toString();

	try {
		const hotel = await Hotel.findById(id);
		res.json(hotel);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching hotel' });
	}
});

router.post('/:hotelId/bookings/payment-intent', async (req, res) => {
	const { numberOfNights } = req.body;
	const hotelId = req.params.hotelId;
	const hotel = await Hotel.findById(hotelId);

	if (!hotel) {
		return res.status(400).json({ message: 'Hotel not found' });
	}

	const totalCost = hotel.pricePerNight * numberOfNights;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalCost * 100,
		payment_method_types: ['card'],
		currency: 'gbp',
		metadata: {
			hotelId,
			userId: req.userId,
		},
	});

	if (!paymentIntent.client_secret) {
		return res.status(500).json({ message: 'Error creating payment intent' });
	}

	const response = {
		paymentIntentId: paymentIntent.id,
		clientSecret: paymentIntent.client_secret.toString(),
		totalCost,
	};
	res.send(response);
});

router.post('/:hotelId/bookings', async (req, res) => {
	try {
		const paymentIntentId = req.body.paymentIntentId;

		const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

		if (!paymentIntent) {
			return res.status(400).json({ message: 'payment intent not found' });
		}

		if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
			return res.status(400).json({ message: 'payment intent mismatch' });
		}

		if (paymentIntent.status !== 'succeeded') {
			return res.status(400).json({
				message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
			});
		}
		const newBooking = {
			...req.body,
			userId: req.body.userId,
			firstName: req.body.firstName || '',
			lastName: req.body.lastName || '',
		};
		const hotel = await Hotel.findById(req.params.hotelId);
		if (!hotel) {
			return res.status(400).json({ message: 'hotel not found' });
		}
		hotel.bookings.push(newBooking);
		await hotel.save();
		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'something went wrong' });
	}
});

const constructSearchQuery = (queryParams) => {
	let constructedQuery = {};
	console.log(queryParams);
	if (queryParams.query) {
		constructedQuery.$or = [{ name: new RegExp(queryParams.query, 'i') }, { city: new RegExp(queryParams.query, 'i') }, { country: new RegExp(queryParams.query, 'i') }];
	}
	if (queryParams.destination) {
		constructedQuery.$or = [{ city: new RegExp(queryParams.destination, 'i') }, { country: new RegExp(queryParams.destination, 'i') }];
	}

	if (queryParams.adultCount) {
		constructedQuery.adultCount = {
			$gte: parseInt(queryParams.adultCount),
		};
	}

	if (queryParams.childCount) {
		constructedQuery.childCount = {
			$gte: parseInt(queryParams.childCount),
		};
	}

	if (queryParams.facilities) {
		constructedQuery.facilities = {
			$all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
		};
	}

	if (queryParams.types) {
		constructedQuery.type = {
			$in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
		};
	}

	if (queryParams.stars) {
		const starRatings = Array.isArray(queryParams.stars) ? queryParams.stars.map((star) => parseInt(star)) : parseInt(queryParams.stars);

		constructedQuery.starRating = { $in: starRatings };
	}

	if (queryParams.maxPrice) {
		constructedQuery.pricePerNight = {
			$lte: parseInt(queryParams.maxPrice).toString(),
		};
	}
	console.log(constructedQuery);
	return constructedQuery;
};

export default router;
